# Villa de Leyva New Year's Trip Website - Requirements Document

## Project Overview
Multi-page, bilingual website for a family New Year's trip to Villa de Leyva, Colombia. Clean, modern design inspired by Airbnb's aesthetic.

## Technical Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Language**: TypeScript
- **Weather API**: Open-Meteo (https://api.open-meteo.com)

## Project References
**CRITICAL**: All images, screenshots, and reference materials are located in the **Project References** folder. 

**Always reference this folder FIRST for:**
- Hero image for the property
- Airbnb design inspiration images and UI patterns
- Bedroom layout examples and bed icons
- Room assignment card styling
- Navigation bar examples
- Color palette references
- Typography examples
- Any other design assets or visual inspiration

**Implementation Notes:**
- Use images from Project References folder whenever possible
- Fallback URLs are provided only as backups if specific images aren't available in Project References
- Study the Airbnb screenshots in Project References for precise styling and layout patterns
- Check for any additional design assets or style guides in the folder before creating custom solutions

## Design System

### Color Palette (Airbnb-inspired)
- Primary: `#FF5A5F` (coral/red)
- Background: `#FFFFFF` (white)
- Text: `#484848` (dark gray)
- Secondary Text: `#767676` (medium gray)
- Borders: `#EBEBEB` (light gray)

### Typography
- Headings: Font-weight 600-700, clean sans-serif
- Body: Font-weight 400, 16px base
- Spacing: Generous whitespace, airy layouts

### Style Guidelines
- Clean, minimal design
- Card-based layouts with subtle shadows
- Rounded corners (6-8px)
- Smooth transitions and hover effects
- Responsive design (mobile-first)
- Modern, professional aesthetic

## Environment Variables

Create `.env.local`:
```
GOOGLE_MAPS_LINK=  # Optional - only displays "Get Directions" button if provided
```

## Internationalization (i18n)

### Default Language: Spanish (Colombian)
### Secondary Language: English

**Language Toggle**: Button in navigation bar (ES | EN)

### Translation Keys Required

| Key | Spanish | English |
|-----|---------|---------|
| title | Casa de Lujo en Villa de Leyva | Luxury House in Villa de Leyva |
| home | Inicio | Home |
| thingsToDo | Qué Hacer | Things to Do |
| getDirections | Obtener Direcciones | Get Directions |
| learnMore | Más Información | Learn More |
| viewOnMaps | Ver en Google Maps | View on Google Maps |
| opensInNewTab | (abre en nueva pestaña) | (opens in new tab) |
| tripInfo | Información del Viaje | Trip Information |
| address | Dirección | Address |
| checkIn | Entrada | Check-In |
| checkOut | Salida | Check-Out |
| at | a las | at |
| countdown | Cuenta Regresiva | Countdown to Trip |
| daysUntil | Días Hasta Nuestro Viaje | Days Until Our Trip |
| days | días | days |
| itinerary | Itinerario | Itinerary |
| roomAssignments | Asignación de Habitaciones | Room Assignments |
| weather | Clima | Weather |
| bedroom | Habitación | Bedroom |
| doubleBed | Cama Doble | Double Bed |
| queenBed | Cama Queen | Queen Bed |
| singleBed | Cama Individual | Single Bed |
| singleBeds | Camas Individuales | Single Beds |
| guests | Huéspedes | Guests |
| restaurants | Restaurantes | Restaurants |
| breakfast | Desayuno | Breakfast |
| lunch | Almuerzo | Lunch |
| dinner | Cena | Dinner |
| activities | Actividades | Activities |
| cultural | Cultural | Cultural |
| natureAdventure | Naturaleza y Aventura | Nature & Adventure |
| nearby | Atracciones Cercanas | Nearby Attractions |
| familyFriendly | Para Toda la Familia | Family-Friendly |
| high | Máx | High |
| low | Mín | Low |
| tuesday | Martes | Tuesday |
| wednesday | Miércoles | Wednesday |
| thursday | Jueves | Thursday |
| friday | Viernes | Friday |
| december | Diciembre | December |
| january | Enero | January |

## Page Structure

### Navigation Component
- Sticky navigation bar
- Logo/Title: "CASA DE LUJO EN VILLA DE LEYVA" / "LUXURY HOUSE IN VILLA DE LEYVA"
- Menu items: Home, Things to Do
- Language toggle: ES | EN
- "Get Directions" button (top-right, only if `GOOGLE_MAPS_LINK` env var exists)
  - Opens link in new tab
  - Styled as primary CTA button

### Footer Component
- Simple, centered
- Copyright text
- Year: 2025-2026

---

## HOME PAGE (`/` or `/home`)

### 1. Hero Section
**Layout**: Full-width, full-height viewport section

**Background Image**:
- **Primary Source**: Check Project References folder first for hero images
- **Fallback URL** (if not in Project References):
```
https://a0.muscache.com/im/pictures/miso/Hosting-40104674/original/411b7bf9-e9e3-41ce-9b4c-02ee97b99572.jpeg?im_w=1200
```
- Image should be optimized using Next.js `<Image>` component
- Apply dark overlay (rgba(0,0,0,0.3)) for text readability

**Overlay Content** (centered, white text with dark overlay):
- Property name (large, bold): "CASA DE LUJO EN VILLA DE LEYVA" / "LUXURY HOUSE IN VILLA DE LEYVA"
- Trip dates: "December 30, 2025 - January 2, 2026" / "30 de Diciembre, 2025 - 2 de Enero, 2026"

### 2. Trip Information Section
**Layout**: Centered card, max-width 800px

**Content**:
- Icon: MapPin
- Title: "Trip Information"
- Address: "Villa de Leyva, Boyacá, Colombia"
  - Note: Full address TBD, will be updated when available
- Check-in: Tuesday, December 30, 2025 @ 3:00 PM
- Check-out: Friday, January 2, 2026 @ 12:00 PM

### 3. Countdown Section
**Visibility**: Only show if current date/time is before December 30, 2025, 3:00 PM

**Layout**: Centered, prominent card

**Content**:
- Large number showing days remaining
- Label: "Days Until Our Trip"
- Calculate days remaining until: `December 30, 2025, 3:00 PM Colombia time (America/Bogota timezone)`

**Logic**:
```javascript
const tripStart = new Date('2025-12-30T15:00:00-05:00'); // Colombia time
const now = new Date();
const daysRemaining = Math.floor((tripStart - now) / (1000 * 60 * 60 * 24));
```

### 4. Itinerary Section
**Layout**: Card-based timeline

**Content**:

**Tuesday, December 30, 2025**
- 3:00 PM - Check-in

**Wednesday, December 31, 2025** (New Year's Eve)
- 8:00 PM - Family Dinner at the House
- 12:00 AM - New Year's Celebration

**Thursday, January 1, 2026** (New Year's Day)
- Open for activities

**Friday, January 2, 2026**
- 12:00 PM - Check-out

### 5. Room Assignments Section
**Layout**: Grid of bedroom cards (Airbnb style)

**Design**: Each card should have:
- Bedroom number/name
- Bed icon or image (check Project References folder for bed icons/images)
- Bed configuration
- Guest names (bullet list)
- Clean, minimal card design with subtle shadow
- Reference Airbnb bedroom cards in Project References folder for styling inspiration

**Bedrooms**:

**Bedroom 1**
- 1 Double Bed
- 2 Single Beds
- Guests:
  - Juan Diego & Valentina
  - Marly
  - Mama de Valentina

**Bedroom 2**
- 1 Queen Bed
- 3 Single Beds
- Guests:
  - Cesar & Angelica
  - David Felipe
  - Gabby
  - Abuelo David

**Bedroom 3**
- 1 Double Bed
- 1 Single Bed
- Guests:
  - Cliff & Marcela
  - Tia Obeida

**Bedroom 4**
- 1 Double Bed
- Guests:
  - Juan & Kelly

**Bedroom 5**
- 1 Queen Bed
- 1 Single Bed
- Guests:
  - Truman & Annie
  - Mama de Annie

**IMPORTANT**: Do NOT display ages anywhere. Only display names and bed configurations.

### 6. Weather Section
**Layout**: Card with 4-day forecast

**Data Source**: Open-Meteo API
- Location: Villa de Leyva (Lat: 5.6344, Lon: -73.5264)
- Timezone: America/Bogota

**API Endpoint**:
```
https://api.open-meteo.com/v1/forecast?latitude=5.6344&longitude=-73.5264&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=America/Bogota&start_date=2025-12-30&end_date=2026-01-02
```

**Display Logic**:
1. **Primary**: Try to fetch weather for December 30, 2025 - January 2, 2026
2. **Fallback**: If dates aren't available yet, fetch current weather and display it

**Temperature Units**:
- Spanish version: Celsius (°C)
- English version: Fahrenheit (°F)

**Format**:
- Show each day with:
  - Day name (Tue/Wed/Thu/Fri)
  - Date (Dec 30, Dec 31, Jan 1, Jan 2)
  - High/Low temperatures
  - Weather icon (based on weathercode)

**Weather Code Icons** (use appropriate icons):
- 0: Clear sky (Sun)
- 1-3: Partly cloudy (Cloud + Sun)
- 45, 48: Fog (Cloud)
- 51-67: Rain (CloudRain)
- 71-77: Snow (Cloud)
- 80-99: Thunderstorm (Cloud + lightning)

---

## THINGS TO DO PAGE (`/things-to-do`)

### 1. Page Header
- Title: "Things to Do in Villa de Leyva"
- Subtitle: "Restaurants, activities, and attractions near our house"

### 2. Restaurants Section

**Layout**: Three subsections (Breakfast, Lunch, Dinner) with cards

#### Breakfast
1. **Café Los Gallos**
   - Description (ES): "Café acogedor con excelentes desayunos. Prueba la Changüa."
   - Description (EN): "Cozy café with excellent breakfasts. Try the Changüa."
   - Google Maps search: "Café Los Gallos Villa de Leyva"

2. **Chuska Cocina**
   - Description (ES): "Cocina colombiana moderna. Excelente para desayuno y brunch."
   - Description (EN): "Modern Colombian cuisine. Excellent for breakfast and brunch."
   - Google Maps search: "Chuska Cocina Villa de Leyva"

3. **Mercado Municipal** (Saturdays only until 3 PM)
   - Description (ES): "Mercado de agricultores locales. Solo sábados hasta las 3 PM."
   - Description (EN): "Local farmers market. Saturdays only until 3 PM."
   - Google Maps search: "Mercado Municipal Villa de Leyva"

4. **Astral** (French Bakery)
   - Description (ES): "Panadería francesa con excelentes pasteles y café."
   - Description (EN): "French bakery with excellent pastries and coffee."
   - Google Maps search: "Astral Villa de Leyva"

#### Lunch
1. **Mercado Municipal** (See above)

2. **Cuatro Nudos**
   - Description (ES): "Vista espectacular de la plaza. Cocina internacional."
   - Description (EN): "Spectacular plaza views. International cuisine."
   - Google Maps search: "Cuatro Nudos Villa de Leyva"

3. **Tierra de Carnes**
   - Description (ES): "Carnes a la parrilla y costillas lentas. Famoso por las hamburguesas."
   - Description (EN): "Grilled meats and slow-cooked ribs. Famous for burgers."
   - Google Maps search: "Tierra de Carnes Villa de Leyva"

4. **La Maria Bistro**
   - Description (ES): "Cocina colombiana e internacional. Dos ubicaciones."
   - Description (EN): "Colombian and international cuisine. Two locations."
   - Google Maps search: "La Maria Bistro Villa de Leyva"

#### Dinner
1. **Casa San Pedro** (Restaurante)
   - Description (ES): "Excelente servicio y comida. Pasta altamente recomendada."
   - Description (EN): "Excellent service and food. Highly recommended pasta."
   - Google Maps search: "Restaurante Casa San Pedro Villa de Leyva"

2. **El Rincón Gourmet De la Villa**
   - Description (ES): "Piano bar y cocina mediterránea. Ambiente romántico."
   - Description (EN): "Piano bar and Mediterranean cuisine. Romantic atmosphere."
   - Google Maps search: "El Rincón Gourmet Villa de Leyva"

3. **Zarina Restaurante** (Lebanese)
   - Description (ES): "Cocina libanesa excepcional. Prueba el falafel y tabule."
   - Description (EN): "Exceptional Lebanese cuisine. Try the falafel and tabule."
   - Google Maps search: "Zarina Restaurante Villa de Leyva"

4. **Tierra de Carnes** (See above)

**Card Format for Restaurants**:
- Restaurant name (bold)
- Brief description
- **"View on Google Maps" link** (primary CTA button)
  - Link format: `https://www.google.com/maps/search/?api=1&query=[Restaurant+Name+Villa+de+Leyva]`
  - Opens in new tab
  - Example: `https://www.google.com/maps/search/?api=1&query=Cafe+Los+Gallos+Villa+de+Leyva`
- **"Learn More" link** (secondary text link)
  - Link format: `https://www.google.com/search?q=[Restaurant+Name]+Villa+de+Leyva`
  - Opens in new tab

### 3. Activities Section

**Layout**: Four categories with activity cards

#### Cultural
1. **Plaza Mayor**
   - Description (ES): "La plaza de adoquines más grande de Colombia. Centro histórico."
   - Description (EN): "Colombia's largest cobblestone plaza. Historic center."
   - Link: `https://www.google.com/maps/search/?api=1&query=Plaza+Mayor+Villa+de+Leyva`

2. **Museo El Fósil**
   - Description (ES): "Fósil de Kronosaurus de 120 millones de años. 10 min en carro."
   - Description (EN): "120-million-year-old Kronosaurus fossil. 10 min drive."
   - Link: `https://www.google.com/maps/search/?api=1&query=Museo+El+Fossil+Villa+de+Leyva`

3. **Casa Terracota**
   - Description (ES): "Casa de barro más grande del mundo. 20-25 min a pie."
   - Description (EN): "World's largest pottery piece. 20-25 min walk."
   - Link: `https://www.google.com/maps/search/?api=1&query=Casa+Terracota+Villa+de+Leyva`

4. **Museo del Carmen**
   - Description (ES): "Uno de los mejores museos de arte religioso de Colombia."
   - Description (EN): "One of Colombia's best religious art museums."
   - Link: `https://www.google.com/maps/search/?api=1&query=Museo+del+Carmen+Villa+de+Leyva`

5. **Casa Museo Antonio Nariño**
   - Description (ES): "Hogar del héroe de la independencia. Entrada gratuita."
   - Description (EN): "Independence hero's home. Free entry."
   - Link: `https://www.google.com/maps/search/?api=1&query=Casa+Museo+Antonio+Narino+Villa+de+Leyva`

#### Nature & Adventure
1. **Pozos Azules** (Blue Wells)
   - Description (ES): "Pozos azules vibrantes. 5 min en carro."
   - Description (EN): "Vibrant blue pools. 5 min drive."
   - Link: `https://www.google.com/maps/search/?api=1&query=Pozos+Azules+Villa+de+Leyva`

2. **Wine Tasting - Viñedo Ain Karim**
   - Description (ES): "Viñedo galardonado. Tours con degustación de vinos."
   - Description (EN): "Award-winning vineyard. Tours with wine tasting."
   - Link: `https://www.google.com/maps/search/?api=1&query=Vinedo+Ain+Karim+Villa+de+Leyva`

3. **Horseback Riding**
   - Description (ES): "Recorridos a caballo por el campo y Pozos Azules."
   - Description (EN): "Horseback tours through countryside and Blue Wells."
   - Link: `https://www.google.com/search?q=horseback+riding+tours+Villa+de+Leyva`

4. **Hiking - La Periquera Waterfalls**
   - Description (ES): "Parque ecológico con cascadas y bosques de robles."
   - Description (EN): "Ecological park with waterfalls and oak forests."
   - Link: `https://www.google.com/search?q=La+Periquera+Waterfalls+Villa+de+Leyva`

5. **ATV/Quad Tours**
   - Description (ES): "Recorridos en cuatrimoto por el desierto colombiano."
   - Description (EN): "ATV tours through Colombian desert landscape."
   - Link: `https://www.google.com/search?q=ATV+quad+tours+Villa+de+Leyva`

#### Nearby Attractions
1. **Ráquira** (Artisan Town)
   - Description (ES): "Pueblo artesanal colorido. 15 min en carro."
   - Description (EN): "Colorful artisan town. 15 min drive."
   - Link: `https://www.google.com/maps/search/?api=1&query=Raquira+Colombia`

2. **Mano del Artesano**
   - Description (ES): "Escultura gigante de mano con vistas espectaculares."
   - Description (EN): "Giant hand sculpture with spectacular views."
   - Link: `https://www.google.com/maps/search/?api=1&query=Mano+del+Artesano+Raquira`

3. **Casa al Revés** (Upside Down House)
   - Description (ES): "Casa al revés. Divertido para todas las edades."
   - Description (EN): "Upside down house. Fun for all ages."
   - Link: `https://www.google.com/maps/search/?api=1&query=Casa+al+Reves+Villa+de+Leyva`

4. **El Infiernito** (Archaeological Site)
   - Description (ES): "Sitio arqueológico Muisca en las colinas."
   - Description (EN): "Muisca archaeological site in the hills."
   - Link: `https://www.google.com/maps/search/?api=1&query=El+Infiernito+Villa+de+Leyva`

#### Family-Friendly
1. **Museo del Chocolate**
   - Description (ES): "Museo, tienda y café de chocolate. Dulces locales deliciosos."
   - Description (EN): "Chocolate museum, shop, and café. Delicious local treats."
   - Link: `https://www.google.com/maps/search/?api=1&query=Museo+del+Chocolate+Villa+de+Leyva`

2. **Walking Tours**
   - Description (ES): "Tours guiados por el casco antiguo colonial."
   - Description (EN): "Guided tours through colonial old town."
   - Link: `https://www.google.com/search?q=walking+tours+Villa+de+Leyva`

3. **Saturday Market**
   - Description (ES): "Mercado de agricultores con productos frescos y comida."
   - Description (EN): "Farmers market with fresh produce and food."
   - Link: `https://www.google.com/maps/search/?api=1&query=Mercado+Municipal+Villa+de+Leyva`

4. **Bike Rentals**
   - Description (ES): "Alquiler de bicicletas para explorar el pueblo."
   - Description (EN): "Bike rentals to explore the town."
   - Link: `https://www.google.com/search?q=bike+rentals+Villa+de+Leyva`

**Card Format for Activities**:
- Activity name (bold)
- Icon representing category
- Brief description
- Time/distance from town center (if applicable)
- **"Learn More" button or link**
  - Opens in new tab
  - Uses Google Maps link for specific locations
  - Uses Google Search for activity types (tours, rentals)

---

## Technical Implementation Notes

### Responsive Design
- Mobile: Single column, stacked layout
- Tablet: 2-column grid where appropriate
- Desktop: Multi-column layouts with max-width containers

### Performance
- Optimize images (use Next.js Image component)
- Lazy load below-the-fold content
- Minimize bundle size

### Accessibility
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- **External links**: All links to restaurants, activities, and maps should:
  - Open in new tab (`target="_blank"`)
  - Include `rel="noopener noreferrer"` for security
  - Have descriptive aria-labels (e.g., "View Café Los Gallos on Google Maps")

### SEO
- Meta tags for each page
- Open Graph tags
- Proper heading hierarchy
- Alt text for all images

### Error Handling
- Graceful fallbacks for API failures (weather)
- Loading states for async operations
- User-friendly error messages

---

## File Structure Recommendation

```
/app
  layout.tsx (root layout with nav/footer)
  page.tsx (home page)
  things-to-do
    page.tsx (things to do page)
/components
  Navigation.tsx
  Footer.tsx
  Hero.tsx
  TripInfo.tsx
  Countdown.tsx
  Itinerary.tsx
  RoomAssignments.tsx
  Weather.tsx
  RestaurantCard.tsx
  ActivityCard.tsx
/lib
  translations.ts (i18n dictionary)
  utils.ts (helper functions)
/public
  (any local images/assets)
```

---

## Deployment Instructions

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `GOOGLE_MAPS_LINK` (optional)
3. Deploy

### Custom Domain (Optional)
- Configure custom domain in Vercel settings

---

## Testing Checklist

- [ ] Both languages work correctly
- [ ] Countdown displays and hides appropriately
- [ ] Weather data loads (or shows fallback)
- [ ] Navigation works on all pages
- [ ] "Get Directions" only shows when env var is set
- [ ] Responsive on mobile, tablet, desktop
- [ ] All restaurant links work correctly (Google Maps)
- [ ] All activity links work correctly (Google Maps/Search)
- [ ] All external links open in new tabs with proper security attributes
- [ ] Temperature units convert correctly (C/F)
- [ ] Room assignments display properly
- [ ] Itinerary is readable and formatted well
- [ ] Images from Project References folder load correctly
- [ ] Hero image displays properly on all screen sizes

---

## Future Enhancements (Post-MVP)
- Photo gallery from the trip
- RSVP tracking
- Packing list
- Shared expenses tracker
- Real-time chat for trip participants
- Post-trip memories/photos section