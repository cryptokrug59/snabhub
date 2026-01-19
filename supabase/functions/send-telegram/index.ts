import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SHEETDB_URL = "https://sheetdb.io/api/v1/brbdihyizfzvy";

interface RequestFormData {
  type: 'request';
  name: string;
  phone: string;
  email: string;
  request: string;
}

interface TenderFormData {
  type: 'tender';
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  tenderNumber: string;
  tenderLink: string;
  comment: string;
}

type FormData = RequestFormData | TenderFormData;

const formatRequestMessage = (data: RequestFormData): string => {
  return `📋 *Новая заявка с сайта*

👤 *Имя:* ${data.name}
📞 *Телефон:* ${data.phone}
📧 *Email:* ${data.email || 'Не указан'}
📝 *Запрос:* ${data.request || 'Не указан'}`;
};

const formatTenderMessage = (data: TenderFormData): string => {
  return `📑 *Приглашение на тендер*

🏢 *Организация:* ${data.company}
👤 *Контактное лицо:* ${data.contactPerson}
📧 *Email:* ${data.email}
📞 *Телефон:* ${data.phone}
🔢 *Номер тендера:* ${data.tenderNumber || 'Не указан'}
🔗 *Ссылка:* ${data.tenderLink || 'Не указана'}
💬 *Комментарий:* ${data.comment || 'Не указан'}`;
};

const sendToSheetDB = async (formData: FormData): Promise<void> => {
  const now = new Date().toISOString();
  
  let sheetData: Record<string, string>;
  
  if (formData.type === 'request') {
    sheetData = {
      created_at: now,
      name: formData.name || '',
      phone: formData.phone || '',
      email: formData.email || '',
      message: formData.request || '',
      session_id: '',
      user_message: '',
      ai_answer: '',
      source: 'form'
    };
  } else {
    // Tender form - combine all data into message field
    sheetData = {
      created_at: now,
      name: formData.contactPerson || '',
      phone: formData.phone || '',
      email: formData.email || '',
      message: `Организация: ${formData.company}, Тендер: ${formData.tenderNumber || 'N/A'}, Ссылка: ${formData.tenderLink || 'N/A'}, Комментарий: ${formData.comment || 'N/A'}`,
      session_id: '',
      user_message: '',
      ai_answer: '',
      source: 'form_tender'
    };
  }

  try {
    const response = await fetch(SHEETDB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [sheetData] }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SheetDB error:", errorText);
    } else {
      console.log("Data sent to SheetDB successfully");
    }
  } catch (error) {
    console.error("Failed to send to SheetDB:", error);
  }
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Missing Telegram credentials");
      throw new Error("Telegram credentials not configured");
    }

    const formData: FormData = await req.json();
    console.log("Received form data:", formData);

    // Send to SheetDB first
    await sendToSheetDB(formData);

    let message: string;
    if (formData.type === 'tender') {
      message = formatTenderMessage(formData);
    } else {
      message = formatRequestMessage(formData);
    }

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    const telegramResult = await telegramResponse.json();
    console.log("Telegram API response:", telegramResult);

    if (!telegramResult.ok) {
      console.error("Telegram API error:", telegramResult);
      throw new Error(telegramResult.description || "Failed to send message to Telegram");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Message sent to Telegram and SheetDB" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-telegram function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
