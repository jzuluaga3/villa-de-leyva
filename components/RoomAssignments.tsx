'use client';

import { Bed, Users } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { getTranslation } from '@/lib/translations';

interface BedConfig {
  type: 'double' | 'queen' | 'single';
  count: number;
}

interface Room {
  number: number;
  beds: BedConfig[];
  guests: string[];
}

export function RoomAssignments() {
  const { lang } = useI18n();

  const rooms: Room[] = [
    {
      number: 1,
      beds: [
        { type: 'double', count: 1 },
        { type: 'single', count: 2 },
      ],
      guests: [
        lang === 'es' ? 'Juan Diego & Valentina' : 'Juan Diego & Valentina',
        'Marly',
        lang === 'es' ? 'Mama de Valentina' : 'Valentina\'s Mom',
      ],
    },
    {
      number: 2,
      beds: [
        { type: 'queen', count: 1 },
        { type: 'single', count: 3 },
      ],
      guests: [
        'Cesar & Angelica',
        'David Felipe',
        'Gabby',
        lang === 'es' ? 'Abuelo David' : 'Grandfather David',
      ],
    },
    {
      number: 3,
      beds: [
        { type: 'double', count: 1 },
        { type: 'single', count: 1 },
      ],
      guests: [
        'Cliff & Marcela',
        lang === 'es' ? 'Tia Obeida' : 'Aunt Obeida',
      ],
    },
    {
      number: 4,
      beds: [
        { type: 'double', count: 1 },
      ],
      guests: [
        'Juan & Kelly',
      ],
    },
    {
      number: 5,
      beds: [
        { type: 'queen', count: 1 },
        { type: 'single', count: 1 },
      ],
      guests: [
        'Truman & Annie',
        lang === 'es' ? 'Mama de Annie' : 'Annie\'s Mom',
      ],
    },
  ];

  const getBedLabel = (type: string, count: number): string => {
    if (count === 1) {
      return getTranslation(lang, type === 'double' ? 'doubleBed' : type === 'queen' ? 'queenBed' : 'singleBed');
    } else {
      return `${count} ${getTranslation(lang, type === 'single' ? 'singleBeds' : type === 'double' ? 'doubleBed' : 'queenBed')}`;
    }
  };

  return (
    <section className="py-8 md:py-16 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-text-primary text-center">
            {getTranslation(lang, 'roomAssignments')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.number}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                {getTranslation(lang, 'bedroom')} {room.number}
              </h3>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Bed className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-text-secondary">
                    {getTranslation(lang, 'bedroom')}
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 ml-4 md:ml-2 [&>li::marker]:text-primary">
                  {room.beds.map((bed, index) => (
                    <li key={index} className="text-sm text-text-primary">
                      {getBedLabel(bed.type, bed.count)}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-text-secondary">
                    {getTranslation(lang, 'guests')}
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 ml-4 md:ml-2 [&>li::marker]:text-primary">
                  {room.guests.map((guest, index) => (
                    <li key={index} className="text-sm text-text-primary">
                      {guest}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}