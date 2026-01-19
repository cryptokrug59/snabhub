import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SHEETDB_URL = "https://sheetdb.io/api/v1/brbdihyizfzvy";

const SYSTEM_PROMPT = `Ты — AI-консультант компании СнабХаб-Групп, эксперт по комплексному снабжению строительных и промышленных предприятий.

Твои знания включают:
- Стройматериалы: кирпич, блоки, бетон, сухие смеси, утеплители, металлопрокат
- Электроинструмент: профессиональное оборудование Bosch, Makita, Dewalt и расходники
- ГСМ и масла: моторные, гидравлические, трансмиссионные масла, смазки
- Спецодежда и СИЗ: полная экипировка для рабочих
- Строительные услуги: ремонт, монтаж инженерных систем, кровельные и фасадные работы
- Тендерное сопровождение: подготовка документации, поиск закупок

Правила общения:
1. Будь дружелюбным и профессиональным
2. Давай конкретные рекомендации по материалам и оборудованию
3. При сложных вопросах предлагай оставить заявку для связи с менеджером
4. Отвечай кратко, но информативно (2-4 предложения)
5. Если вопрос не относится к снабжению/строительству, вежливо направь к теме

Контакты компании: телефон для заявок доступен на сайте.`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: Message[];
  sessionId?: string;
}

const sendToSheetDB = async (
  sessionId: string,
  userMessage: string,
  aiAnswer: string
): Promise<void> => {
  const now = new Date().toISOString();
  
  const sheetData = {
    created_at: now,
    name: '',
    phone: '',
    email: '',
    message: '',
    session_id: sessionId,
    user_message: userMessage,
    ai_answer: aiAnswer,
    source: 'AI'
  };

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
      console.log("AI chat data sent to SheetDB successfully");
    }
  } catch (error) {
    console.error("Failed to send to SheetDB:", error);
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      console.error("Missing LOVABLE_API_KEY");
      throw new Error("AI service not configured");
    }

    const { messages, sessionId }: ChatRequest = await req.json();
    console.log("Received messages:", messages.length);

    // Get the last user message
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();

    const aiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map(m => ({ role: m.role, content: m.content }))
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: aiMessages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", errorText);
      throw new Error("Failed to get AI response");
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || "Извините, не удалось получить ответ.";

    console.log("AI response received");

    // Send to SheetDB (non-blocking, we don't wait for it)
    if (lastUserMessage && sessionId) {
      sendToSheetDB(sessionId, lastUserMessage.content, assistantMessage);
    }

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in ai-chat function:", error);
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
