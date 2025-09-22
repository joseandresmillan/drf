import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    projectType: "",
    budget: "",
    timeline: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        subject: "",
        message: "",
        projectType: "",
        budget: "",
        timeline: ""
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const projectTypes = [
    'web',
    'mobile',
    'blockchain',
    'ai',
    'automation',
    'consulting'
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
              {t('contact.form.name')} *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
              placeholder="Juan Pérez"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              {t('contact.form.email')} *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
              placeholder="juan@empresa.com"
            />
          </div>
        </div>

        {/* Company and Phone Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="company">
              {t('contact.form.company')}
            </label>
            <input
              type="text"
              name="company"
              id="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Mi Empresa S.A."
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phone">
              {t('contact.form.phone')}
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="+593 XXX XXXX"
            />
          </div>
        </div>

        {/* Project Type and Budget Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="projectType">
              {t('contact.form.projectType')}
            </label>
            <select
              name="projectType"
              id="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Selecciona un tipo</option>
              {projectTypes.map(type => (
                <option key={type} value={type}>
                  {t(`contact.projectTypes.${type}`)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="budget">
              {t('contact.form.budget')}
            </label>
            <select
              name="budget"
              id="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Selecciona un rango</option>
              <option value="1000-5000">$1,000 - $5,000</option>
              <option value="5000-15000">$5,000 - $15,000</option>
              <option value="15000-50000">$15,000 - $50,000</option>
              <option value="50000+">$50,000+</option>
            </select>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="subject">
            {t('contact.form.subject')} *
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
            placeholder="Necesito una aplicación web..."
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="message">
            {t('contact.form.message')} *
          </label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            rows="6"
            required
            placeholder="Describe tu proyecto en detalle..."
          ></textarea>
        </div>

        {/* Timeline */}
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="timeline">
            {t('contact.form.timeline')}
          </label>
          <select
            name="timeline"
            id="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Selecciona un tiempo</option>
            <option value="urgent">Urgente (1-2 semanas)</option>
            <option value="normal">Normal (1-2 meses)</option>
            <option value="flexible">Flexible (3+ meses)</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
          </motion.button>
        </div>

        {/* Status Messages */}
        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center p-4 rounded-lg ${
              submitStatus === 'success'
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}
          >
            {submitStatus === 'success' ? t('contact.form.success') : t('contact.form.error')}
          </motion.div>
        )}
      </form>
    </div>
  );
}

export default ContactForm;