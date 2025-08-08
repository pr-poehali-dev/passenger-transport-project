export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, phone, route, passengers, date, message } = req.body;

  // Валидация обязательных полей
  if (!name || !phone || !route) {
    return res.status(400).json({ message: 'Заполните обязательные поля' });
  }

  try {
    // Формируем письмо
    const emailContent = `
Новая заявка на перевозку от ЗаказАвтобусов

Клиент: ${name}
Телефон: ${phone}
Маршрут: ${route}
Количество пассажиров: ${passengers || 'Не указано'}
Дата поездки: ${date || 'Не указана'}

Дополнительные пожелания:
${message || 'Не указаны'}

---
Заявка получена: ${new Date().toLocaleString('ru-RU')}
    `;

    // Отправляем на указанную почту
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'default_service',
        template_id: 'template_order',
        user_id: 'public_key',
        template_params: {
          to_email: 'kasimova1.r1996@icloud.com',
          subject: 'Новая заявка на перевозку - ЗаказАвтобусов',
          message: emailContent,
          from_name: name,
          reply_to: phone
        }
      })
    });

    if (response.ok) {
      res.status(200).json({ message: 'Заявка успешно отправлена' });
    } else {
      throw new Error('Failed to send email');
    }
    
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Ошибка отправки заявки' });
  }
}