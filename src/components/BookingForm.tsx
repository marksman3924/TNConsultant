import React, { useState } from 'react';

// Lucide icons - you may need to install: npm install lucide-react
// Or use simple SVG/emoji icons instead
const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const Check = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
  </svg>
);

// Lark Webhook Configuration
const LARK_WEBHOOK_URL = import.meta.env.PUBLIC_LARK_WEBHOOK_URL || '';

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  subject: string;
  optIn: boolean;
}

const BookingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    subject: 'Destiny / Personal Reading (BaZi)',
    optIn: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const subjects = [
    "Destiny / Personal Reading (BaZi)",
    "Business & Strategy Planning (Qi Men / Business Date Selection)",
    "Feng Shui (Home / Office Alignment)",
    "Date Selection (Training Specifics)",
    "Unsure – I need your recommendation"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const payload = {
        ...formData,
        submittedAt: new Date().toISOString(),
        source: typeof window !== 'undefined' ? window.location.hostname : 'unknown',
      };

      if (!LARK_WEBHOOK_URL) {
        console.log("📋 Booking Request (Dev Mode):", payload);
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        const response = await fetch(LARK_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Webhook Error: ${response.status}`);
        }
      }
     
      setSubmitStatus('success');
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        date: '', 
        subject: subjects[0], 
        optIn: false 
      });
      
      setTimeout(() => setSubmitStatus('idle'), 5000);

    } catch (error) {
      console.error("Submission Failed:", error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="glass border border-cream/10 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cream/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <h2 className="font-serif text-3xl md:text-4xl text-white mb-8 relative z-10">
          Bắt Đầu Chiến Lược Của Bạn
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          
          {/* Name */}
          <div className="space-y-2">
            <label className="text-white font-medium text-sm">Họ và Tên *</label>
            <input 
              type="text" 
              name="name" 
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-dark border border-cream/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cream transition-colors placeholder-gray-light"
              placeholder="Nguyễn Văn A"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-white font-medium text-sm">Email *</label>
            <input 
              type="email" 
              name="email" 
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-dark border border-cream/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cream transition-colors placeholder-gray-light"
              placeholder="name@example.com"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-white font-medium text-sm">Số Điện Thoại</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-1 border-r border-cream/20 pr-3">
                <span className="text-lg">🇻🇳</span>
                <ChevronDown className="w-3 h-3 text-gray-light" />
              </div>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-dark border border-cream/20 rounded-lg pl-24 pr-4 py-3 text-white focus:outline-none focus:border-cream transition-colors placeholder-gray-light"
                placeholder="091 234 56 78"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-2">
            <label className="text-white font-medium text-sm">Thời Gian Mong Muốn</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/80 pointer-events-none" />
              <input 
                type="datetime-local" 
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-dark border border-cream/20 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-cream transition-colors"
              />
            </div>
          </div>

          {/* Subject Radio Group */}
          <div className="space-y-3 pt-2">
            <label className="text-white font-medium text-sm">Chủ Đề Tư Vấn</label>
            <div className="space-y-3">
              {subjects.map((subj) => (
                <label key={subj} className="flex items-start space-x-3 cursor-pointer group">
                  <div className="relative flex items-center pt-1">
                    <input 
                      type="radio" 
                      name="subject" 
                      value={subj} 
                      checked={formData.subject === subj}
                      onChange={handleChange}
                      className="peer appearance-none w-5 h-5 rounded-full border border-cream/30 checked:border-cream bg-transparent transition-all cursor-pointer"
                    />
                    <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-cream scale-0 peer-checked:scale-100 transition-transform pointer-events-none"></div>
                  </div>
                  <span className={`text-sm transition-colors ${formData.subject === subj ? 'text-white' : 'text-gray-light group-hover:text-white'}`}>
                    {subj}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex flex-col space-y-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 w-full"
              style={{ backgroundColor: '#D4AF37', color: '#1e1e1e' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Đang Gửi...</span>
                </>
              ) : (
                <span>Gửi Yêu Cầu</span>
              )}
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-900/30 border border-green-500/30 text-green-200 text-sm rounded-lg text-center">
                ✓ Cảm ơn bạn! Chúng tôi đã nhận được yêu cầu và sẽ liên hệ trong thời gian sớm nhất.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-900/30 border border-red-500/30 text-red-200 text-sm rounded-lg text-center">
                ✗ Kết nối thất bại. Vui lòng kiểm tra mạng hoặc thử lại sau.
              </div>
            )}
          </div>

          {/* Opt-in */}
          <div className="flex items-start space-x-3 pt-2">
            <div className="relative flex items-center pt-1">
              <input 
                type="checkbox" 
                name="optIn" 
                checked={formData.optIn}
                onChange={handleChange}
                className="peer appearance-none w-5 h-5 rounded border border-cream/30 checked:border-cream checked:bg-cream/10 transition-all cursor-pointer"
              />
              <Check className="absolute inset-0 m-auto w-3.5 h-3.5 text-cream scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
            </div>
            <p className="text-xs text-gray-light leading-relaxed">
              Bằng cách đăng ký, bạn đồng ý nhận thông tin marketing qua email, tin nhắn và cuộc gọi. 
              Bạn có thể hủy đăng ký bất cứ lúc nào.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BookingForm;