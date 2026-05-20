import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchServices } from '../redux/actions/services';

export const useServices = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const apiServices = useSelector((state) => state.services.list);
  const apiLoading = useSelector((state) => state.services.loading);

  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const normalizeIcon = useCallback((iconName) => {
    if (!iconName) return '⚙️';
    // Si ya es un emoji o un texto corto, se puede renderizar directamente.
    if (iconName.length <= 2 || /[\u{1F300}-\u{1FAFF}]/u.test(iconName)) {
      return iconName;
    }
    return '⚙️';
  }, []);

  const getDefaultFeatures = useCallback((service) => {
    if (Array.isArray(service.features) && service.features.length > 0) {
      return service.features;
    }
    if (typeof service.features === 'string' && service.features.trim()) {
      return service.features.split(',').map((item) => item.trim()).filter(Boolean);
    }
    return [service.icon_name || 'Servicio Digital'];
  }, []);

  const mappedServices = useMemo(() => {
    return (apiServices || []).map((service) => ({
      ...service,
      name: (i18n.language === 'en' ? service.name_en : service.name) || service.name,
      description:
        (i18n.language === 'en' ? service.description_en : service.description) || service.description,
      icon: normalizeIcon(service.icon_name),
      category: service.category_slug || 'general',
      categoryLabel:
        (i18n.language === 'en' ? service.category_name_en : service.category_name) ||
        service.category_name ||
        t('services.categories.all'),
      timeline: service.timeline || `2-6 ${t('services.timeline.weeks')}`,
      features: getDefaultFeatures(service),
      popular: Boolean(service.is_popular),
    }));
  }, [apiServices, getDefaultFeatures, i18n.language, normalizeIcon, t]);

  const getCategories = useCallback((servicesData) => {
    const grouped = servicesData.reduce((acc, service) => {
      const categoryKey = service.category || 'general';
      acc[categoryKey] = (acc[categoryKey] || 0) + 1;
      return acc;
    }, {});

    return [
      { id: 'all', name: t('services.categories.all'), count: servicesData.length },
      ...Object.keys(grouped).map((key) => ({
        id: key,
        name: servicesData.find((item) => item.category === key)?.categoryLabel || key,
        count: grouped[key],
      })),
    ];
  }, [t]);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    setServices(mappedServices);
    const servicesData = mappedServices;

    if (selectedCategory === 'all') {
      setFilteredServices(servicesData);
    } else {
      setFilteredServices(servicesData.filter(service => service.category === selectedCategory));
    }
  }, [mappedServices, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const getPopularServices = () => {
    return services.filter(service => service.popular);
  };

  return {
    services: filteredServices,
    allServices: services,
    categories: getCategories(services),
    selectedCategory,
    loading: apiLoading,
    handleCategoryChange,
    getPopularServices
  };
};

export default useServices;
