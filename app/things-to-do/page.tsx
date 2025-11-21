'use client';

import { RestaurantCard } from '@/components/RestaurantCard';
import { ActivityCard } from '@/components/ActivityCard';
import { useI18n } from '@/lib/i18n-context';
import { getTranslation } from '@/lib/translations';
import { UtensilsCrossed, Mountain, Map, Heart, BookOpen } from 'lucide-react';

export default function ThingsToDo() {
  const { lang } = useI18n();

  const restaurants = {
    breakfast: [
      {
        name: 'Café Los Gallos',
        descriptionEs: 'Café acogedor con excelentes desayunos. Prueba la Changüa.',
        descriptionEn: 'Cozy café with excellent breakfasts. Try the Changüa.',
        googleMapsQuery: 'Café Los Gallos Villa de Leyva',
      },
      {
        name: 'Chuska Cocina',
        descriptionEs: 'Cocina colombiana moderna. Excelente para desayuno y brunch.',
        descriptionEn: 'Modern Colombian cuisine. Excellent for breakfast and brunch.',
        googleMapsQuery: 'Chuska Cocina Villa de Leyva',
      },
      {
        name: 'Mercado Municipal',
        descriptionEs: 'Mercado de agricultores locales. Solo sábados hasta las 3 PM.',
        descriptionEn: 'Local farmers market. Saturdays only until 3 PM.',
        googleMapsQuery: 'Mercado Municipal Villa de Leyva',
        note: lang === 'es' ? '(Solo sábados hasta las 3 PM)' : '(Saturdays only until 3 PM)',
      },
      {
        name: 'Astral',
        descriptionEs: 'Panadería francesa con excelentes pasteles y café.',
        descriptionEn: 'French bakery with excellent pastries and coffee.',
        googleMapsQuery: 'Astral Villa de Leyva',
        note: lang === 'es' ? '(Panadería Francesa)' : '(French Bakery)',
      },
    ],
    lunch: [
      {
        name: 'Mercado Municipal',
        descriptionEs: 'Mercado de agricultores locales. Solo sábados hasta las 3 PM.',
        descriptionEn: 'Local farmers market. Saturdays only until 3 PM.',
        googleMapsQuery: 'Mercado Municipal Villa de Leyva',
        note: lang === 'es' ? '(Solo sábados hasta las 3 PM)' : '(Saturdays only until 3 PM)',
      },
      {
        name: 'Cuatro Nudos',
        descriptionEs: 'Vista espectacular de la plaza. Cocina internacional.',
        descriptionEn: 'Spectacular plaza views. International cuisine.',
        googleMapsQuery: 'Cuatro Nudos Villa de Leyva',
      },
      {
        name: 'Tierra de Carnes',
        descriptionEs: 'Carnes a la parrilla y costillas lentas. Famoso por las hamburguesas.',
        descriptionEn: 'Grilled meats and slow-cooked ribs. Famous for burgers.',
        googleMapsQuery: 'Tierra de Carnes Villa de Leyva',
      },
      {
        name: 'La Maria Bistro',
        descriptionEs: 'Cocina colombiana e internacional. Dos ubicaciones.',
        descriptionEn: 'Colombian and international cuisine. Two locations.',
        googleMapsQuery: 'La Maria Bistro Villa de Leyva',
      },
    ],
    dinner: [
      {
        name: 'Casa San Pedro',
        descriptionEs: 'Excelente servicio y comida. Pasta altamente recomendada.',
        descriptionEn: 'Excellent service and food. Highly recommended pasta.',
        googleMapsQuery: 'Restaurante Casa San Pedro Villa de Leyva',
      },
      {
        name: 'El Rincón Gourmet De la Villa',
        descriptionEs: 'Piano bar y cocina mediterránea. Ambiente romántico.',
        descriptionEn: 'Piano bar and Mediterranean cuisine. Romantic atmosphere.',
        googleMapsQuery: 'El Rincón Gourmet Villa de Leyva',
      },
      {
        name: 'Zarina Restaurante',
        descriptionEs: 'Cocina libanesa excepcional. Prueba el falafel y tabule.',
        descriptionEn: 'Exceptional Lebanese cuisine. Try the falafel and tabule.',
        googleMapsQuery: 'Zarina Restaurante Villa de Leyva',
        note: lang === 'es' ? '(Libanesa)' : '(Lebanese)',
      },
      {
        name: 'Tierra de Carnes',
        descriptionEs: 'Carnes a la parrilla y costillas lentas. Famoso por las hamburguesas.',
        descriptionEn: 'Grilled meats and slow-cooked ribs. Famous for burgers.',
        googleMapsQuery: 'Tierra de Carnes Villa de Leyva',
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
      },
      {
        name: 'Museo El Fósil',
        descriptionEs: 'Fósil de Kronosaurus de 120 millones de años. 10 min en carro.',
        descriptionEn: '120-million-year-old Kronosaurus fossil. 10 min drive.',
        link: 'https://www.google.com/maps/search/?api=1&query=Museo+El+Fossil+Villa+de+Leyva',
      },
      {
        name: 'Casa Terracota',
        descriptionEs: 'Casa de barro más grande del mundo. 20-25 min a pie.',
        descriptionEn: "World's largest pottery piece. 20-25 min walk.",
        link: 'https://www.google.com/maps/search/?api=1&query=Casa+Terracota+Villa+de+Leyva',
      },
      {
        name: 'Museo del Carmen',
        descriptionEs: 'Uno de los mejores museos de arte religioso de Colombia.',
        descriptionEn: "One of Colombia's best religious art museums.",
        link: 'https://www.google.com/maps/search/?api=1&query=Museo+del+Carmen+Villa+de+Leyva',
      },
      {
        name: 'Casa Museo Antonio Nariño',
        descriptionEs: 'Hogar del héroe de la independencia. Entrada gratuita.',
        descriptionEn: "Independence hero's home. Free entry.",
        link: 'https://www.google.com/maps/search/?api=1&query=Casa+Museo+Antonio+Narino+Villa+de+Leyva',
      },
    ],
    nature: [
      {
        name: 'Pozos Azules',
        descriptionEs: 'Pozos azules vibrantes. 5 min en carro.',
        descriptionEn: 'Vibrant blue pools. 5 min drive.',
        link: 'https://www.google.com/maps/search/?api=1&query=Pozos+Azules+Villa+de+Leyva',
      },
      {
        name: 'Wine Tasting - Viñedo Ain Karim',
        descriptionEs: 'Viñedo galardonado. Tours con degustación de vinos.',
        descriptionEn: 'Award-winning vineyard. Tours with wine tasting.',
        link: 'https://www.google.com/maps/search/?api=1&query=Vinedo+Ain+Karim+Villa+de+Leyva',
      },
      {
        name: 'Horseback Riding',
        descriptionEs: 'Recorridos a caballo por el campo y Pozos Azules.',
        descriptionEn: 'Horseback tours through countryside and Blue Wells.',
        link: 'https://www.google.com/search?q=horseback+riding+tours+Villa+de+Leyva',
        linkType: 'search' as const,
      },
      {
        name: 'Hiking - La Periquera Waterfalls',
        descriptionEs: 'Parque ecológico con cascadas y bosques de robles.',
        descriptionEn: 'Ecological park with waterfalls and oak forests.',
        link: 'https://www.google.com/search?q=La+Periquera+Waterfalls+Villa+de+Leyva',
        linkType: 'search' as const,
      },
      {
        name: 'ATV/Quad Tours',
        descriptionEs: 'Recorridos en cuatrimoto por el desierto colombiano.',
        descriptionEn: 'ATV tours through Colombian desert landscape.',
        link: 'https://www.google.com/search?q=ATV+quad+tours+Villa+de+Leyva',
        linkType: 'search' as const,
      },
    ],
    nearby: [
      {
        name: 'Ráquira',
        descriptionEs: 'Pueblo artesanal colorido. 15 min en carro.',
        descriptionEn: 'Colorful artisan town. 15 min drive.',
        link: 'https://www.google.com/maps/search/?api=1&query=Raquira+Colombia',
      },
      {
        name: 'Mano del Artesano',
        descriptionEs: 'Escultura gigante de mano con vistas espectaculares.',
        descriptionEn: 'Giant hand sculpture with spectacular views.',
        link: 'https://www.google.com/maps/search/?api=1&query=Mano+del+Artesano+Raquira',
      },
      {
        name: 'Casa al Revés',
        descriptionEs: 'Casa al revés. Divertido para todas las edades.',
        descriptionEn: 'Upside down house. Fun for all ages.',
        link: 'https://www.google.com/maps/search/?api=1&query=Casa+al+Reves+Villa+de+Leyva',
      },
      {
        name: 'El Infiernito',
        descriptionEs: 'Sitio arqueológico Muisca en las colinas.',
        descriptionEn: 'Muisca archaeological site in the hills.',
        link: 'https://www.google.com/maps/search/?api=1&query=El+Infiernito+Villa+de+Leyva',
      },
    ],
    family: [
      {
        name: 'Museo del Chocolate',
        descriptionEs: 'Museo, tienda y café de chocolate. Dulces locales deliciosos.',
        descriptionEn: 'Chocolate museum, shop, and café. Delicious local treats.',
        link: 'https://www.google.com/maps/search/?api=1&query=Museo+del+Chocolate+Villa+de+Leyva',
      },
      {
        name: 'Walking Tours',
        descriptionEs: 'Tours guiados por el casco antiguo colonial.',
        descriptionEn: 'Guided tours through colonial old town.',
        link: 'https://www.google.com/search?q=walking+tours+Villa+de+Leyva',
        linkType: 'search' as const,
      },
      {
        name: 'Saturday Market',
        descriptionEs: 'Mercado de agricultores con productos frescos y comida.',
        descriptionEn: 'Farmers market with fresh produce and food.',
        link: 'https://www.google.com/maps/search/?api=1&query=Mercado+Municipal+Villa+de+Leyva',
      },
      {
        name: 'Bike Rentals',
        descriptionEs: 'Alquiler de bicicletas para explorar el pueblo.',
        descriptionEn: 'Bike rentals to explore the town.',
        link: 'https://www.google.com/search?q=bike+rentals+Villa+de+Leyva',
        linkType: 'search' as const,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
      <section className="py-16 px-4">
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
          <div className="mb-12">
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
          <div className="mb-12">
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
          <div className="mb-12">
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
      <section className="py-16 px-4 bg-white">
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
          <div className="mb-12">
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
          <div className="mb-12">
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
          <div className="mb-12">
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
          <div className="mb-12">
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
