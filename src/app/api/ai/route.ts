import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const gameState = await req.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `أنت "مستشار سهم الذكي"، خبير اقتصادي وتجاري في لعبة متجر سهم.
لديك هذه البيانات عن متجر اللاعب الحالي:
- الرصيد: ${gameState.capital} ريال
- الأرباح الإجمالية: ${gameState.totalProfits} ريال
- مستوى المتجر: ${gameState.levelName}
- رضا العملاء: ${gameState.customerSatisfaction}%
- المنتجات المتوفرة: ${JSON.stringify(gameState.products)}

بناءً على هذه البيانات، قم بإعطاء 3 نصائح عملية ومختصرة للاعب (نصيحة للمبيعات، تنبيه للمخزون، واقتراح للتوسع). 
قم بإرجاع النتيجة بصيغة JSON فقط بهذا الشكل:
{
  "sales": "نصيحة المبيعات هنا",
  "inventory": "تنبيه المخزون هنا",
  "expansion": "اقتراح التوسع هنا"
}
تأكد من إرجاع JSON صالح بدون أي نصوص إضافية قبل أو بعد.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up potential markdown formatting in response
    const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const advice = JSON.parse(jsonStr);

    return NextResponse.json(advice);
  } catch (error) {
    console.error('Error generating AI advice:', error);
    return NextResponse.json({ error: 'Failed to generate advice' }, { status: 500 });
  }
}
