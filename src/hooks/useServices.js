import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useServices = () => {
  const { t } = useTranslation();
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const getServicesData = useCallback(() => ([
    {
      id: 1,
      name: t('services.items.fullstack.name'),
      description: t('services.items.fullstack.description'),
      icon: "🚀",
      features: ["Django 4.2", "React 18", "PostgreSQL", "Docker"],
      category: "development",
      timeline: "4-8 " + t('services.timeline.weeks'),
      popular: true
    },
    {
      id: 2,
      name: t('services.items.web3.name'),
      description: t('services.items.web3.description'),
      icon: "⛓️",
      features: ["Smart Contracts", "DApps", "NFTs", "DeFi", "Ethereum"],
      category: "blockchain",
      timeline: "6-12 " + t('services.timeline.weeks'),
      popular: false
    },
    {
      id: 3,
      name: t('services.items.ai.name'),
      description: t('services.items.ai.description'),
      icon: "👁️",
      features: ["Object Detection", "Image Recognition", "MLOps", "TensorFlow", "OpenCV"],
      category: "ai",
      timeline: "8-16 " + t('services.timeline.weeks'),
      popular: true
    },
    {
      id: 4,
      name: t('services.items.automation.name'),
      description: t('services.items.automation.description'),
      icon: "⚙️",
      features: ["RPA", "APIs", "Integrations", "Workflows", "Analytics"],
      category: "automation",
      timeline: "2-6 " + t('services.timeline.weeks'),
      popular: false
    },
    {
      id: 5,
      name: t('services.items.consulting.name'),
      description: t('services.items.consulting.description'),
      icon: "💡",
      features: ["Architecture", "Strategy", "Optimization", "Training", "Support"],
      category: "consulting",
      timeline: "1-4 " + t('services.timeline.weeks'),
      popular: false
    },
    {
      id: 6,
      name: t('services.items.devops.name'),
      description: t('services.items.devops.description'),
      icon: "☁️",
      features: ["Docker", "Kubernetes", "CI/CD", "Monitoring"],
      category: "devops",
      timeline: "3-8 " + t('services.timeline.weeks'),
      popular: true
    }
  ]), [t]);

  const getCategories = (servicesData) => [
    { id: 'all', name: t('services.categories.all'), count: servicesData.length },
    { id: 'development', name: t('services.categories.development'), count: servicesData.filter(s => s.category === 'development').length },
    { id: 'blockchain', name: t('services.categories.blockchain'), count: servicesData.filter(s => s.category === 'blockchain').length },
    { id: 'ai', name: t('services.categories.ai'), count: servicesData.filter(s => s.category === 'ai').length },
    { id: 'automation', name: t('services.categories.automation'), count: servicesData.filter(s => s.category === 'automation').length },
    { id: 'consulting', name: t('services.categories.consulting'), count: servicesData.filter(s => s.category === 'consulting').length },
    { id: 'devops', name: t('services.categories.devops'), count: servicesData.filter(s => s.category === 'devops').length },
  ];

  useEffect(() => {
    // Cargar datos inmediatamente sin simulación de carga
    const servicesData = getServicesData();
    setServices(servicesData);
    setFilteredServices(servicesData);
    setLoading(false);
  }, [getServicesData]);

  useEffect(() => {
    const servicesData = services.length > 0 ? services : getServicesData();
    if (selectedCategory === 'all') {
      setFilteredServices(servicesData);
    } else {
      setFilteredServices(servicesData.filter(service => service.category === selectedCategory));
    }
  }, [selectedCategory, services, getServicesData]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const getPopularServices = () => {
    return services.filter(service => service.popular);
  };

  return {
    services: filteredServices,
    allServices: services,
    categories: getCategories(services.length > 0 ? services : getServicesData()),
    selectedCategory,
    loading,
    handleCategoryChange,
    getPopularServices
  };
};

export default useServices;
