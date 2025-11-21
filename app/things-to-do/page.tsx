'use client';

import { RestaurantCard } from '@/components/RestaurantCard';
import { ActivityCard } from '@/components/ActivityCard';
import { SubNavigation } from '@/components/SubNavigation';
import { useI18n } from '@/lib/i18n-context';
import { getTranslation } from '@/lib/translations';
import { UtensilsCrossed, Mountain, Map, Heart, BookOpen } from 'lucide-react';

/**
 * Google Business Profile (GBP) Ratings
 * 
 * To add ratings:
 * 1. Add `rating` (number 0-5) and `reviewCount` (number) to any restaurant/activity
 * 2. For dynamic ratings: Add NEXT_PUBLIC_GOOGLE_PLACES_API_KEY to .env.local
 *    and use the functions in lib/google-places-ratings.ts to fetch ratings
 * 
 * Example:
 * {
 *   name: 'Restaurant Name',
 *   rating: 4.5,
 *   reviewCount: 123,
 *   ...
 * }
 */
export default function ThingsToDo() {
  const { lang } = useI18n();

  const restaurants = {
    breakfast: [
      {
        name: 'Café Los Gallos',
        descriptionEs: 'Café acogedor con excelentes desayunos. Prueba la Changüa.',
        descriptionEn: 'Cozy café with excellent breakfasts. Try the Changüa.',
        googleMapsQuery: 'Café Los Gallos Villa de Leyva',
        rating: 4.5,
        reviewCount: 344,
        priceRange: 'COP $20.000 - $30.000',
      },
      {
        name: 'Chuska Cocina',
        descriptionEs: 'Cocina colombiana moderna. Excelente para desayuno y brunch.',
        descriptionEn: 'Modern Colombian cuisine. Excellent for breakfast and brunch.',
        googleMapsQuery: 'Chuska Cocina Villa de Leyva',
        rating: 4.9,
        reviewCount: 4805,
      },
      {
        name: 'Mercado Municipal',
        descriptionEs: 'Mercado de agricultores locales. Solo sábados hasta las 3 PM.',
        descriptionEn: 'Local farmers market. Saturdays only until 3 PM.',
        googleMapsQuery: 'Mercado Municipal Villa de Leyva',
        note: lang === 'es' ? '(Solo sábados hasta las 3 PM)' : '(Saturdays only until 3 PM)',
        rating: 4.4,
        reviewCount: 1642,
      },
      {
        name: 'Astral',
        descriptionEs: 'Panadería francesa con excelentes pasteles y café.',
        descriptionEn: 'French bakery with excellent pastries and coffee.',
        googleMapsQuery: 'Astral Villa de Leyva',
        note: lang === 'es' ? '(Panadería Francesa)' : '(French Bakery)',
        rating: 4.7,
        reviewCount: 428,
        priceRange: 'COP $1.000 - $20.000',
      },
    ],
    lunch: [
      {
        name: 'Mercado Municipal',
        descriptionEs: 'Mercado de agricultores locales. Solo sábados hasta las 3 PM.',
        descriptionEn: 'Local farmers market. Saturdays only until 3 PM.',
        googleMapsQuery: 'Mercado Municipal Villa de Leyva',
        note: lang === 'es' ? '(Solo sábados hasta las 3 PM)' : '(Saturdays only until 3 PM)',
        rating: 4.4,
        reviewCount: 1642,
      },
      {
        name: 'Tierra de Carnes',
        descriptionEs: 'Carnes a la parrilla y costillas lentas. Famoso por las hamburguesas.',
        descriptionEn: 'Grilled meats and slow-cooked ribs. Famous for burgers.',
        googleMapsQuery: 'Tierra de Carnes Villa de Leyva',
        rating: 4.7,
        reviewCount: 1305,
        priceRange: 'COP $40.000 - $60.000',
      },
      {
        name: 'La Maria Bistro',
        descriptionEs: 'Cocina colombiana e internacional. Dos ubicaciones.',
        descriptionEn: 'Colombian and international cuisine. Two locations.',
        googleMapsQuery: 'La Maria Bistro Villa de Leyva',
        rating: 4.6,
        reviewCount: 864,
        priceRange: 'COP $25.000 - $40.000',
      },
    ],
    dinner: [
      {
        name: 'Casa San Pedro',
        descriptionEs: 'Excelente servicio y comida. Pasta altamente recomendada.',
        descriptionEn: 'Excellent service and food. Highly recommended pasta.',
        googleMapsQuery: 'Restaurante Casa San Pedro Villa de Leyva',
        rating: 4.4,
        reviewCount: 1963,
        priceRange: 'COP $60.000 - $80.000',
      },
      {
        name: 'Zarina Restaurante',
        descriptionEs: 'Cocina libanesa excepcional. Prueba el falafel y tabule.',
        descriptionEn: 'Exceptional Lebanese cuisine. Try the falafel and tabule.',
        googleMapsQuery: 'Zarina Restaurante Villa de Leyva',
        note: lang === 'es' ? '(Libanesa)' : '(Lebanese)',
        rating: 4.5,
        reviewCount: 169,
        priceRange: 'COP $40.000 - $50.000',
      },
      {
        name: 'Tierra de Carnes',
        descriptionEs: 'Carnes a la parrilla y costillas lentas. Famoso por las hamburguesas.',
        descriptionEn: 'Grilled meats and slow-cooked ribs. Famous for burgers.',
        googleMapsQuery: 'Tierra de Carnes Villa de Leyva',
        rating: 4.7,
        reviewCount: 1305,
        priceRange: 'COP $40.000 - $60.000',
      },
    ],
  };

  const activities = {
    cultural: [
      {
        name: 'Plaza Mayor',
        descriptionEs: 'La plaza de adoquines más grande de Colombia. Centro histórico.',
        descriptionEn: "Colombia's largest cobblestone plaza. Historic center.",
        link: 'https://www.google.com/maps/search/?api=1&query=Plaza+Mayor+Villa+de+Leyva',
        images: [
          'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyEyQN_wW0YBY4HNxX0EJTV9eEQm4JwRMCJEGrTpfuB9uq_MQg9bvfcZ4x31TU3q_lka3aYZzr0K9ka3o1lKzU-n7dvMwu5UdahVL-SqQwn9354Xv3NLu1vap2tVcBktl4XZ1wfJFTUV-B_=w408-h306-k-no',
        ],
      },
      {
        name: 'Museo El Fósil',
        descriptionEs: 'Fósil de Kronosaurus de 120 millones de años. 10 min en carro.',
        descriptionEn: '120-million-year-old Kronosaurus fossil. 10 min drive.',
        link: 'https://www.google.com/maps/search/?api=1&query=Museo+El+Fossil+Villa+de+Leyva',
        images: [
          'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxLyVlThIgi-0MyzdgHf7C9FrNF2CuOEel-hS9TBirahvwpeTyk-KQcEavQ2ThSVEH07UsWSRGwDzcP_5muMA8W4ojTYv9bH4yAEwmMaJCUBlLTp-z5ZGdH8u6oycSiofYYg3faAQ=w408-h302-k-no',
        ],
      },
      {
        name: 'Casa Terracota',
        descriptionEs: 'Casa de barro más grande del mundo. 20-25 min a pie.',
        descriptionEn: "World's largest pottery piece. 20-25 min walk.",
        link: 'https://www.google.com/maps/search/?api=1&query=Casa+Terracota+Villa+de+Leyva',
        images: [
          'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwizL0atxHqDM5pozHnVByD2MOVlnGt-9VkOqnFdhBikvvOoyFpG9ra_dZwk83TNFLIUBgg9voox3DD9l51R3DCyxPES_tlRFraPwuAtuN0m8m0DbHJwox2qbes_bK3eFaZy0PO=w408-h306-k-no',
        ],
      },
      {
        name: 'Museo del Carmen',
        descriptionEs: 'Uno de los mejores museos de arte religioso de Colombia.',
        descriptionEn: "One of Colombia's best religious art museums.",
        link: 'https://www.google.com/maps/search/?api=1&query=Museo+del+Carmen+Villa+de+Leyva',
        images: [
          'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxg9qp_Zewjorh7iaahNtO6rt5z5dAuVCO6Lexn4D_VHu5w80u5sqaXOVzfU0ME3VqSWT1a5maHT6vIngV2GPGoYu-KEfpq1BNgyzPcDmZ-JAsNS8KNMCugX-VKFqQPH8f9w70=w408-h306-k-no',
        ],
      },
      {
        name: 'Casa Museo Antonio Nariño',
        descriptionEs: 'Hogar del héroe de la independencia. Entrada gratuita.',
        descriptionEn: "Independence hero's home. Free entry.",
        link: 'https://www.google.com/maps/search/?api=1&query=Casa+Museo+Antonio+Narino+Villa+de+Leyva',
        images: [
          'https://lh3.googleusercontent.com/p/AF1QipOxA83NFItfVXz9hTfFiKJKhAiC9mRBD7A_HERK=w408-h306-k-no',
        ],
      },
    ],
    nature: [
      {
        name: 'Pozos Azules',
        descriptionEs: 'Pozos azules vibrantes. 5 min en carro.',
        descriptionEn: 'Vibrant blue pools. 5 min drive.',
        link: 'https://www.google.com/maps/search/?api=1&query=Pozos+Azules+Villa+de+Leyva',
        images: [
          'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSw4HfeZaeH72-FmKkV8Mn9JEXZXQ74FzMJY0ai4RdueXBJBy3rFb6gXiGjUeOvr1vZbUrgvFc9rZSKKK660amLl8N4c8IQwhajVic84PdyLxxds5CEay50HuuOGlcehXjuXZS2RkcvhmxKB=w408-h307-k-no',
        ],
      },
      {
        name: 'Wine Tasting - Viñedo Ain Karim',
        descriptionEs: 'Viñedo galardonado. Tours con degustación de vinos.',
        descriptionEn: 'Award-winning vineyard. Tours with wine tasting.',
        link: 'https://www.google.com/maps/search/?api=1&query=Vinedo+Ain+Karim+Villa+de+Leyva',
        images: [
          'https://lh3.googleusercontent.com/p/AF1QipOfkTaAJuX3-pE-sMP5iZ7auZVs7qA-BP1xNGgc=w408-h272-k-no',
        ],
      },
      {
        name: 'Horseback Riding',
        descriptionEs: 'Recorridos a caballo por el campo y Pozos Azules.',
        descriptionEn: 'Horseback tours through countryside and Blue Wells.',
        link: 'https://www.google.com/search?q=horseback+riding+tours+Villa+de+Leyva',
        linkType: 'search' as const,
        images: [
          'https://www.civitatis.com/f/colombia/villa-de-leyva/galeria/disfrutando-paseo-caballo-lagos.jpg',
        ],
      },
      {
        name: 'Hiking - La Periquera Waterfalls',
        descriptionEs: 'Parque ecológico con cascadas y bosques de robles.',
        descriptionEn: 'Ecological park with waterfalls and oak forests.',
        link: 'https://www.google.com/search?q=La+Periquera+Waterfalls+Villa+de+Leyva',
        linkType: 'search' as const,
        images: [
          'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwHidAlI3VIeXWALHetN9jfV9LTShjYqMbZwmHTFGPkYhGktwPHR6zBIxDa--tva1LeODT8dAv3ska9cxGnqUxYlPbK33oaO2o7ZfLh9NL74u5rohVam0CnVtUpHwzxW9dbq611=s1360-w1360-h1020-rw',
        ],
      },
      {
        name: 'ATV/Quad Tours',
        descriptionEs: 'Recorridos en cuatrimoto por el desierto colombiano.',
        descriptionEn: 'ATV tours through Colombian desert landscape.',
        link: 'https://www.google.com/search?q=ATV+quad+tours+Villa+de+Leyva',
        linkType: 'search' as const,
        images: [
          'https://www.civitatis.com/f/colombia/villa-de-leyva/galeria/junto-lagos-azules.jpg',
        ],
      },
    ],
    nearby: [
      {
        name: 'Ráquira',
        descriptionEs: 'Pueblo artesanal colorido. 15 min en carro.',
        descriptionEn: 'Colorful artisan town. 15 min drive.',
        link: 'https://www.google.com/maps/search/?api=1&query=Raquira+Colombia',
        images: [
          'https://imagescdn.citix.com.co/citix/production/media/media/a2e3ef95f3eecc402c8bc9f491419f90.jpg',
        ],
      },
      {
        name: 'Mano del Artesano',
        descriptionEs: 'Escultura gigante de mano con vistas espectaculares.',
        descriptionEn: 'Giant hand sculpture with spectacular views.',
        link: 'https://www.google.com/maps/search/?api=1&query=Mano+del+Artesano+Raquira',
        images: [
          'https://lh3.googleusercontent.com/p/AF1QipMfATVvyZgnHxongTFaHtQIdDucBZeyaM8GPujA=s1360-w1360-h1020-rw',
        ],
      },
      {
        name: 'Casa al Revés',
        descriptionEs: 'Casa al revés. Divertido para todas las edades.',
        descriptionEn: 'Upside down house. Fun for all ages.',
        link: 'https://www.google.com/maps/search/?api=1&query=Casa+al+Reves+Villa+de+Leyva',
        images: [
          'https://lh3.googleusercontent.com/p/AF1QipNmZWEcxlLVUGXvi9rV9a76hW81pE0Eb10q0JXk=s1360-w1360-h1020-rw',
        ],
      },
    ],
    family: [
      {
        name: 'Museo del Chocolate',
        descriptionEs: 'Museo, tienda y café de chocolate. Dulces locales deliciosos.',
        descriptionEn: 'Chocolate museum, shop, and café. Delicious local treats.',
        link: 'https://www.google.com/maps/search/?api=1&query=Museo+del+Chocolate+Villa+de+Leyva',
        images: [
          'https://museodelchocolate.com.co/wp-content/uploads/2024/11/IMG_20220204_101535-1.jpg',
        ],
      },
      {
        name: 'Walking Tours',
        descriptionEs: 'Tours guiados por el casco antiguo colonial.',
        descriptionEn: 'Guided tours through colonial old town.',
        link: 'https://www.google.com/search?q=walking+tours+Villa+de+Leyva',
        linkType: 'search' as const,
        images: [],
      },
      {
        name: 'Saturday Market',
        descriptionEs: 'Mercado de agricultores con productos frescos y comida.',
        descriptionEn: 'Farmers market with fresh produce and food.',
        link: 'https://www.google.com/maps/search/?api=1&query=Mercado+Municipal+Villa+de+Leyva',
        images: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQGN2VQTPKlmlHgdU9WKH8XpDPonVixnFINQ&s',
        ],
      },
      {
        name: 'Bike Rentals',
        descriptionEs: 'Alquiler de bicicletas para explorar el pueblo.',
        descriptionEn: 'Bike rentals to explore the town.',
        link: 'https://www.google.com/search?q=bike+rentals+Villa+de+Leyva',
        linkType: 'search' as const,
        images: [],
      },
    ],
  };

  const subNavItems = [
    { id: 'restaurants', label: getTranslation(lang, 'restaurants') },
    { id: 'breakfast', label: getTranslation(lang, 'breakfast') },
    { id: 'lunch', label: getTranslation(lang, 'lunch') },
    { id: 'dinner', label: getTranslation(lang, 'dinner') },
    { id: 'activities', label: getTranslation(lang, 'activities') },
    { id: 'cultural', label: getTranslation(lang, 'cultural') },
    { id: 'nature', label: getTranslation(lang, 'natureAdventure') },
    { id: 'nearby', label: getTranslation(lang, 'nearby') },
    { id: 'family', label: getTranslation(lang, 'familyFriendly') },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SubNavigation items={subNavItems} />
      
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {lang === 'es' ? 'Qué Hacer en Villa de Leyva' : 'Things to Do in Villa de Leyva'}
          </h1>
          <p className="text-xl text-text-secondary">
            {lang === 'es'
              ? 'Restaurantes, actividades y atracciones cerca de nuestra casa'
              : 'Restaurants, activities, and attractions near our house'}
          </p>
        </div>
      </section>

      {/* Restaurants Section */}
      <section id="restaurants" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <UtensilsCrossed className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-semibold text-text-primary">
                {getTranslation(lang, 'restaurants')}
              </h2>
            </div>
          </div>

          {/* Breakfast */}
          <div id="breakfast" className="mb-12 scroll-mt-24">
            <h3 className="text-2xl font-semibold text-text-primary mb-6">
              {getTranslation(lang, 'breakfast')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {restaurants.breakfast.map((restaurant, index) => (
                <RestaurantCard key={index} {...restaurant} />
              ))}
            </div>
          </div>

          {/* Lunch */}
          <div id="lunch" className="mb-12 scroll-mt-24">
            <h3 className="text-2xl font-semibold text-text-primary mb-6">
              {getTranslation(lang, 'lunch')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {restaurants.lunch.map((restaurant, index) => (
                <RestaurantCard key={index} {...restaurant} />
              ))}
            </div>
          </div>

          {/* Dinner */}
          <div id="dinner" className="mb-12 scroll-mt-24">
            <h3 className="text-2xl font-semibold text-text-primary mb-6">
              {getTranslation(lang, 'dinner')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {restaurants.dinner.map((restaurant, index) => (
                <RestaurantCard key={index} {...restaurant} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Mountain className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-semibold text-text-primary">
                {getTranslation(lang, 'activities')}
              </h2>
            </div>
          </div>

          {/* Cultural */}
          <div id="cultural" className="mb-12 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="text-2xl font-semibold text-text-primary">
                {getTranslation(lang, 'cultural')}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.cultural.map((activity, index) => (
                <ActivityCard key={index} category="cultural" {...activity} />
              ))}
            </div>
          </div>

          {/* Nature & Adventure */}
          <div id="nature" className="mb-12 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Mountain className="w-5 h-5 text-primary" />
              <h3 className="text-2xl font-semibold text-text-primary">
                {getTranslation(lang, 'natureAdventure')}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.nature.map((activity, index) => (
                <ActivityCard key={index} category="nature" {...activity} />
              ))}
            </div>
          </div>

          {/* Nearby Attractions */}
          <div id="nearby" className="mb-12 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Map className="w-5 h-5 text-primary" />
              <h3 className="text-2xl font-semibold text-text-primary">
                {getTranslation(lang, 'nearby')}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.nearby.map((activity, index) => (
                <ActivityCard key={index} category="nearby" {...activity} />
              ))}
            </div>
          </div>

          {/* Family-Friendly */}
          <div id="family" className="mb-12 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-5 h-5 text-primary" />
              <h3 className="text-2xl font-semibold text-text-primary">
                {getTranslation(lang, 'familyFriendly')}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.family.map((activity, index) => (
                <ActivityCard key={index} category="family" {...activity} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
