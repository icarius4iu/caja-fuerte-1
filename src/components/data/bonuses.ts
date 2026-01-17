export interface Bonus {
    slug: string;
    title: string;
    type: 'welcome' | 'free_bet' | 'rollover' | 'combined' | 'cashback';
    logo: string;
    bgColor: string;
    investment: string;
    profit: string;
    profitLabel: string;
    description: string;
    videoUrl?: string;
    verification: string;
    paymentMethods: string;
    updatedAt: string;
    // New fields
    profitAmount: number;
    investmentAmount: number;
    popularity: number;
    country: 'PE' | 'Global';
}

export const bonuses: Bonus[] = [
    {
        slug: 'gangabet',
        title: 'Bienvenida Gangabet',
        type: 'welcome',
        logo: 'https://i.imgur.com/8Qj8jXl.png',
        bgColor: 'bg-green-600',
        investment: 'S/. 200',
        investmentAmount: 200,
        profit: 'S/. 20',
        profitAmount: 20,
        profitLabel: 'Ganancia',
        description: 'Regístrate en Gangabet y gana S/. 100 giros gratis.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        verification: 'DNI + SELFIE',
        paymentMethods: 'PagoEfectivo',
        updatedAt: '03/03/25',
        profitAmount: 20,
        investmentAmount: 200,
        popularity: 98,
        country: 'PE'
    },
    {
        slug: 'meridianbet',
        title: 'Meridianbet Registro',
        type: 'free_bet',
        logo: 'https://i.imgur.com/5z5z5z5.png',
        bgColor: 'bg-red-700',
        investment: 'S/. 0',
        investmentAmount: 0,
        profit: 'No tiene',
        profitAmount: 0,
        profitLabel: 'Ganancia',
        description: 'Regístrate para ganar 500 giros gratis',
        videoUrl: '',
        verification: 'DNI',
        paymentMethods: 'Visa/Mastercard',
        updatedAt: '10/01/26',
        profitAmount: 0,
        investmentAmount: 0,
        popularity: 88,
        country: 'Global'
    },
    {
        slug: '1xbet',
        title: 'Reembolso 1xBet',
        type: 'cashback',
        logo: 'https://i.imgur.com/1x1x1x1.png',
        bgColor: 'bg-blue-600',
        investment: 'S/. 0',
        investmentAmount: 0,
        profit: 'No tiene',
        profitAmount: 0,
        profitLabel: 'Ganancia',
        description: 'Regístrate para tener muchas promos semanales (no recomendamos jugar el bono de bienvenida)',
        videoUrl: '',
        verification: 'EMAIL',
        paymentMethods: 'Crypto',
        updatedAt: '10/01/26',
        profitAmount: 0,
        investmentAmount: 0,
        popularity: 75,
        country: 'Global'
    },
    {
        slug: 'blockbet',
        title: 'Apuesta Gratuita Blockbet',
        type: 'welcome',
        logo: 'https://i.imgur.com/bbbbbb.png',
        bgColor: 'bg-green-500',
        investment: 'S/. 0',
        investmentAmount: 0,
        profit: 'No tiene',
        profitAmount: 0,
        profitLabel: 'Ganancia',
        description: 'Regístrate para tener muchas promos semanales',
        videoUrl: '',
        verification: 'DNI + SELFIE',
        paymentMethods: 'Yape / Plin',
        updatedAt: '11/01/26',
        profitAmount: 0,
        investmentAmount: 0,
        popularity: 92,
        country: 'PE'
    }
];
