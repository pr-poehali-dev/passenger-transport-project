import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    route: '',
    passengers: '',
    date: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Формируем тело письма
    const emailBody = `
Новая заявка на перевозку:

Имя: ${formData.name}
Телефон: ${formData.phone}
Маршрут: ${formData.route}
Количество пассажиров: ${formData.passengers}
Дата поездки: ${formData.date}
Дополнительная информация: ${formData.message}

---
Заявка отправлена с сайта ЗаказАвтобусов
    `.trim();

    // Открываем почтовый клиент
    const mailtoLink = `mailto:kasimova1.r1996@icloud.com?subject=Заявка на перевозку от ${formData.name}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;

    // Показываем сообщение об успехе
    setSubmitStatus('success');
    setFormData({
      name: '',
      phone: '',
      route: '',
      passengers: '',
      date: '',
      message: ''
    });

    setIsSubmitting(false);
  };

  const services = [
    {
      icon: 'Heart',
      title: 'Свадьбы и торжества',
      description: 'Комфортабельный транспорт для особых дней',
      features: ['Украшение автомобиля', 'Фотосъемка в пути', 'Музыкальное сопровождение']
    },
    {
      icon: 'Plane',
      title: 'Трансферы',
      description: 'Встреча в аэропортах и ж/д вокзалах',
      features: ['Встреча с табличкой', 'Помощь с багажом', 'Отслеживание рейсов']
    },
    {
      icon: 'Theater',
      title: 'Культурные мероприятия',
      description: 'Поездки в театры, музеи, концерты',
      features: ['Групповые тарифы', 'Ожидание после мероприятия', 'Комфортные автобусы']
    },
    {
      icon: 'Building',
      title: 'Корпоративные перевозки',
      description: 'Доставка сотрудников, деловые поездки',
      features: ['Регулярные маршруты', 'Корпоративные тарифы', 'Отчетность по поездкам']
    },
    {
      icon: 'Users',
      title: 'Микроавтобусы',
      description: 'Mercedes Sprinter на 8-20 мест',
      features: ['Комфортные сидения', 'Кондиционер', 'Багажное отделение']
    },
    {
      icon: 'Bus',
      title: 'Автобусы',
      description: 'Туристические автобусы на 30-55 мест',
      features: ['Видеосистема', 'Туалет', 'Холодильник']
    }
  ];

  const routes = [
    'Симферополь - Севастополь',
    'Симферополь - Ялта', 
    'Симферополь - Феодосия',
    'Симферополь - Евпатория',
    'Межгород по России',
    'Другой маршрут'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Bus" size={32} className="text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">ЗаказАвтобусов</h2>
            </div>
            <nav className="hidden md:flex space-x-6">
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Услуги
              </button>
              <button 
                onClick={() => scrollToSection('order')} 
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Заказать
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Контакты
              </button>
            </nav>
            <Button 
              className="md:hidden" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <button 
                onClick={() => scrollToSection('services')} 
                className="block w-full text-left text-gray-600 hover:text-primary transition-colors py-2"
              >
                Услуги
              </button>
              <button 
                onClick={() => scrollToSection('order')} 
                className="block w-full text-left text-gray-600 hover:text-primary transition-colors py-2"
              >
                Заказать
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="block w-full text-left text-gray-600 hover:text-primary transition-colors py-2"
              >
                Контакты
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Пассажирские перевозки по Крыму и России
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Комфортные поездки на современном транспорте с профессиональными водителями
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} />
                <span>Лицензированные перевозки</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} />
                <span>Точность по расписанию</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={20} />
                <span>Более 500 довольных клиентов</span>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="mb-8">
              <img 
                src="https://cdn.poehali.dev/files/54bc9337-3cc6-4020-ac7b-8adbc8cfdb28.png" 
                alt="Автопарк ЗаказАвтобусов" 
                className="w-full max-w-3xl mx-auto rounded-lg shadow-xl"
              />
            </div>
            
            <Button 
              size="lg" 
              className="bg-white text-blue-800 hover:bg-blue-50"
              onClick={() => scrollToSection('order')}
            >
              <Icon name="Phone" size={20} className="mr-2" />
              Заказать перевозку
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Наши услуги</h3>
            <p className="text-xl text-gray-600">
              Выберите подходящий транспорт для ваших нужд
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={service.icon as any} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-green-500" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section id="order" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-900 mb-4">Заказать перевозку</h3>
              <p className="text-xl text-gray-600">
                Заполните форму и мы свяжемся с вами в течение 15 минут
              </p>
            </div>
            
            <Card>
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ваше имя *</Label>
                      <Input 
                        id="name" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Введите ваше имя"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input 
                        id="phone" 
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+7 (xxx) xxx-xx-xx"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="route">Маршрут *</Label>
                    <Select value={formData.route} onValueChange={(value) => setFormData({...formData, route: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите маршрут" />
                      </SelectTrigger>
                      <SelectContent>
                        {routes.map((route, index) => (
                          <SelectItem key={index} value={route}>{route}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="passengers">Количество пассажиров</Label>
                      <Input 
                        id="passengers" 
                        type="number"
                        value={formData.passengers}
                        onChange={(e) => setFormData({...formData, passengers: e.target.value})}
                        placeholder="1-55"
                        min="1" max="55"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Дата поездки</Label>
                      <Input 
                        id="date" 
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Дополнительные пожелания</Label>
                    <Textarea 
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Укажите особые требования или вопросы"
                      rows={4}
                    />
                  </div>
                  
                  {submitStatus === 'success' && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                      ✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      ❌ Ошибка отправки заявки. Попробуйте еще раз или свяжитесь с нами по телефону.
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full" 
                    disabled={isSubmitting || !formData.name || !formData.phone || !formData.route}
                  >
                    {isSubmitting ? (
                      <>
                        <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                        Отправляем...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={20} className="mr-2" />
                        Отправить заявку
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Наш автопарк и места назначения
            </h2>
            <p className="text-xl text-gray-600">
              Современные автобусы и красивые места Крыма
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://cdn.poehali.dev/files/426b6bbe-e7ab-4cad-ba01-147a283ea6c9.jpeg" 
                alt="Автобусы компании" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Современный автопарк</h3>
                <p className="text-gray-600">Комфортабельные микроавтобусы Mercedes для ваших поездок</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://cdn.poehali.dev/files/85c1b091-d8f0-43d6-8934-4c68ed1d03c1.jpeg" 
                alt="Автобус в поле маков" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Живописные маршруты</h3>
                <p className="text-gray-600">Путешествуйте по красивейшим местам Крыма в комфорте</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://cdn.poehali.dev/files/5ad72a42-ec35-4f25-b86d-ea8899175da2.jpeg" 
                alt="Микроавтобус Mercedes" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Mercedes Sprinter</h3>
                <p className="text-gray-600">Премиальные микроавтобусы с максимальным комфортом</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://cdn.poehali.dev/files/1131ea80-222f-4113-9587-52614579ccb4.jpeg" 
                alt="Замок в Крыму" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Исторические места</h3>
                <p className="text-gray-600">Посетите уникальные достопримечательности полуострова</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://cdn.poehali.dev/files/256024b8-820c-4afa-8881-942da7dfa26a.jpeg" 
                alt="Туристический автобус Аллея Крыма" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Туристические автобусы</h3>
                <p className="text-gray-600">Большие автобусы для групповых экскурсий по Крыму</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://cdn.poehali.dev/files/7683be57-5f6c-459b-aed2-d2615e46d50f.jpeg" 
                alt="Горная река в Крыму" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Горные реки</h3>
                <p className="text-gray-600">Кристально чистые воды крымских горных рек</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://cdn.poehali.dev/files/f03910db-93b7-412b-9504-9fd2a8c35fc6.jpeg" 
                alt="Горное ущелье Крыма" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Горные ущелья</h3>
                <p className="text-gray-600">Захватывающие виды крымских каньонов и ущелий</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://cdn.poehali.dev/files/85533102-bea8-46b6-ad82-fb51603c74f8.jpeg" 
                alt="Горное озеро в Крыму" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Горные озера</h3>
                <p className="text-gray-600">Живописные озера в окружении крымских гор</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
              <div className="text-center p-8">
                <Icon name="Camera" size={48} className="text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-blue-900">И многое другое</h3>
                <p className="text-blue-700">Откройте для себя все красоты Крыма вместе с нами</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Контакты</h3>
            <p className="text-xl text-blue-200">
              Свяжитесь с нами любым удобным способом
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Phone" size={32} />
              </div>
              <h4 className="text-xl font-semibold">Телефон</h4>
              <a href="tel:+79786007940" className="text-blue-200 hover:text-white transition-colors block">
                +7 (978) 600-79-40
              </a>
              <a 
                href="https://wa.me/79788600763" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="MessageCircle" size={16} />
                +7 (978) 860-07-63 WhatsApp
              </a>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Mail" size={32} />
              </div>
              <h4 className="text-xl font-semibold">Email</h4>
              <p className="text-blue-200">kasimova1.r1996@icloud.com</p>
              <p className="text-blue-200">Заявки и вопросы</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto">
                <Icon name="MapPin" size={32} />
              </div>
              <h4 className="text-xl font-semibold">Адрес</h4>
              <p className="text-blue-200">г. Алушта</p>
              <p className="text-blue-200">Республика Крым</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-blue-200 mb-4">Работаем круглосуточно</p>
            <p className="text-sm text-blue-300">
              © 2024 ЗаказАвтобусов. Все права защищены.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;