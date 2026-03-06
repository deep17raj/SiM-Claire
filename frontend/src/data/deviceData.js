// data/deviceData.js

export const brandsList = [
  { id: 'apple', name: 'Apple', sub: 'iPhone & iPad', iconKey: 'apple' },
  { id: 'samsung', name: 'Samsung', sub: 'Galaxy Series', iconKey: 'samsung' },
  { id: 'google', name: 'Google', sub: 'Pixel Devices', iconKey: 'google' },
  { id: 'huawei', name: 'Huawei', sub: 'P & Mate Series', iconKey: 'huawei' },
  { id: 'motorola', name: 'Motorola', sub: 'Razr & Edge', iconKey: 'motorola' },
  { id: 'others', name: 'Others', sub: 'Xiaomi, Oppo...', iconKey: 'others' },
];

export const deviceData = {
  apple: [
    {
      title: '2024 Models',
      badge: 'New Release',
      models: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16'],
    },
    {
      title: '2023 Models',
      models: ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15'],
    },
    {
      title: '2022 Models',
      models: ['iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14', 'iPhone SE (3rd Gen)'],
    },
    {
      title: '2021 Models',
      models: ['iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13 mini', 'iPhone 13'],
    },
    {
      title: 'iPads & Tablets',
      models: ['iPad Pro 12.9 (4th Gen+)', 'iPad Air (3rd Gen+)', 'iPad mini (5th Gen+)', 'iPad (7th Gen+)'],
    },
    {
      title: 'Legacy Models',
      models: ['iPhone 12 Series', 'iPhone 11 Series', 'iPhone XR / XS / XS Max', 'iPhone SE (2nd Gen)'],
    },
  ],
  samsung: [
    {
      title: 'Galaxy S24 Series',
      badge: 'New Release',
      models: ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24'],
    },
    {
      title: 'Galaxy S23 Series',
      models: ['Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy S23 FE'],
    },
    {
      title: 'Galaxy Z Fold & Flip',
      models: ['Galaxy Z Fold6', 'Galaxy Z Flip6', 'Galaxy Z Fold5', 'Galaxy Z Flip5', 'Galaxy Z Fold4', 'Galaxy Z Flip4'],
    },
    {
      title: 'Legacy S Series',
      models: ['Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22', 'Galaxy S21 Series', 'Galaxy S20 Series', 'Galaxy Note 20 Series'],
    },
  ],
  google: [
    {
      title: 'Pixel 9 Series',
      badge: 'New Release',
      models: ['Pixel 9 Pro Fold', 'Pixel 9 Pro XL', 'Pixel 9 Pro', 'Pixel 9'],
    },
    {
      title: 'Pixel 8 Series',
      models: ['Pixel 8 Pro', 'Pixel 8', 'Pixel 8a'],
    },
    {
      title: 'Pixel 7 & Older',
      models: ['Pixel 7 Pro', 'Pixel 7', 'Pixel 7a', 'Pixel 6 Pro', 'Pixel 6', 'Pixel 6a', 'Pixel 5', 'Pixel 4'],
    },
  ],
  huawei: [
    {
      title: 'Pura & Mate Series',
      models: ['Pura 70 Pro', 'Pura 70', 'Mate 60 Pro', 'Mate 60', 'Mate 50 Pro', 'Mate 40 Pro'],
    },
    {
      title: 'P Series',
      models: ['P60 Pro', 'P60', 'P50 Pro', 'P50', 'P40 Pro', 'P40'],
    },
  ],
  motorola: [
    {
      title: 'Razr Series',
      badge: 'Foldables',
      models: ['Razr 50 Ultra', 'Razr 50', 'Razr 40 Ultra', 'Razr 40', 'Razr+ 2023'],
    },
    {
      title: 'Edge Series',
      models: ['Edge 50 Ultra', 'Edge 50 Pro', 'Edge 40 Pro', 'Edge 40', 'Edge+ (2023)', 'Edge (2022)'],
    },
  ],
  others: [
    {
      title: 'Xiaomi',
      models: ['Xiaomi 14 Pro', 'Xiaomi 14', 'Xiaomi 13 Pro', 'Xiaomi 13', 'Xiaomi 12T Pro'],
    },
    {
      title: 'Oppo & OnePlus',
      models: ['Find X7 Ultra', 'Find X6 Pro', 'Find N3', 'Find N3 Flip', 'OnePlus 12', 'OnePlus 11'],
    },
    {
      title: 'Sony & Others',
      models: ['Xperia 1 VI', 'Xperia 1 V', 'Xperia 5 V', 'Nokia XR21', 'Nothing Phone (2)'],
    },
  ],
};