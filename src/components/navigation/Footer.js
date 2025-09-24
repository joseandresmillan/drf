import { connect } from "react-redux";
import { useTranslation } from 'react-i18next';
import logoNODE from "assets/images/node-blue.gif";
import LanguageSelector from "../common/LanguageSelector";
import { FaInstagram } from 'react-icons/fa';

function Footer() {
  const { t } = useTranslation();

  const navigation = {
    solutions: [
      { name: "Guayaquil, Ecuador", href: "#" },
    ],
    support: [
      { name: "Email:", href: "#", isLabel: true },
      { name: "joseandresmillan16@gmail.com", href: "mailto:joseandresmillan16@gmailcom" },
    ],
    company: [
      { name: t('nav.cases'), href: "/casos" },
      { name: t('nav.services'), href: "/servicios" },
      { name: t('nav.about'), href: "/nosotros" },
      // { name: t('nav.blog'), href: "/blog" },
      { name: t('nav.apod'), href: "/apod" },
    ],
    services: [
      { name: "Web Development", href: "/servicios" },
      { name: "AI & Computer Vision", href: "/servicios" },
    ],
    social: [
      {
        name: "Instagram",
        href: "https://www.instagram.com/node.ec/",
        icon: FaInstagram,
      },
    ],
  };

  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <img
              className="h-10"
              src={logoNODE}
              alt="Node.ec"
            />
            <p className="text-sm leading-6 text-gray-600">
              {t('footer.description')}
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a 
                    key={item.name} 
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-500 transition-colors duration-200 hover:scale-110"
                  >
                    <span className="sr-only">{item.name}</span>
                    <IconComponent className="h-6 w-6" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
            {/* Language Selector in Footer */}
            <div className="pt-4">
              <LanguageSelector variant="footer" />
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  {t('footer.contact')}
                </h3>
                <ul className="mt-6 space-y-4">
                  {navigation.support.map((item, idx) => (
                    <li key={item.name || idx}>
                      {item.isLabel ? (
                        <span className="text-sm font-medium leading-6 text-gray-700 block mb-2">
                          {item.name}
                        </span>
                      ) : (
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {item.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  {t('footer.location')}
                </h3>
                <ul className="mt-6 space-y-4">
                  {navigation.solutions.map((item, idx) => (
                    <li key={item.name || idx}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  {t('footer.company')}
                </h3>
                <ul className="mt-6 space-y-4">
                  {navigation.company.map((item, idx) => (
                    <li key={item.name || idx}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  {t('footer.services')}
                </h3>
                <ul className="mt-6 space-y-4">
                  {navigation.services.map((item, idx) => (
                    <li key={item.name || idx}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-500">
            &copy; 2025 {t('common.nodeEc')}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Footer);