export const categories = ['All', 'Coffee', 'Matcha', 'Tea', 'Cold']

// `liquid` / `foam` drive both the CSS cup thumbnails and the 3D hero cup.
export const menu = [
  { id: 'espresso', name: 'Espresso', category: 'Coffee', price: 2.6, notes: 'Double shot of our Row Blend. Dark cherry, cocoa nib.', liquid: '#3B1E10', foam: '#B9773F', art: 'crema' },
  { id: 'flat-white', name: 'Flat white', category: 'Coffee', price: 3.6, notes: 'Two ristretto shots, silky whole or oat milk.', liquid: '#7A4B2A', foam: '#E8D2B4' },
  { id: 'cortado', name: 'Cortado', category: 'Coffee', price: 3.4, notes: 'Equal parts espresso and warm milk. Short and sweet.', liquid: '#5E3A22', foam: '#D8B48A' },
  { id: 'filter', name: 'Batch filter', category: 'Coffee', price: 3.2, notes: 'Rotating single origin. Ask what is on the grinder today.', liquid: '#4A2412', foam: '#6E3B1E', art: 'crema' },
  { id: 'ceremonial', name: 'Ceremonial matcha', category: 'Matcha', price: 4.2, notes: 'Uji first harvest, whisked with 80°C water. No milk.', liquid: '#5E8A2E', foam: '#9DBB5C', art: 'crema' },
  { id: 'matcha-latte', name: 'Matcha latte', category: 'Matcha', price: 4.4, notes: 'Ceremonial grade over steamed oat milk.', liquid: '#8DAE5A', foam: '#D9E4BE' },
  { id: 'hojicha', name: 'Hojicha latte', category: 'Tea', price: 4.0, notes: 'Roasted green tea, toasty and low in caffeine.', liquid: '#8A5A36', foam: '#E2C9A8' },
  { id: 'chai', name: 'House chai', category: 'Tea', price: 3.9, notes: 'Cardamom, clove and black pepper, brewed in-house.', liquid: '#A0663A', foam: '#E9CFAE' },
  { id: 'cold-brew', name: 'Cold brew', category: 'Cold', price: 3.8, notes: 'Steeped 18 hours. Served over one big cube.', liquid: '#2E1609', foam: '#4D2914', iced: true },
  { id: 'iced-matcha', name: 'Iced matcha', category: 'Cold', price: 4.6, notes: 'Matcha poured over cold oat milk and ice.', liquid: '#9BBE63', foam: '#E8F0D2', iced: true },
  { id: 'espresso-tonic', name: 'Espresso tonic', category: 'Cold', price: 4.2, notes: 'Double shot over tonic, orange peel.', liquid: '#6B3A1C', foam: '#C9873F', iced: true },
  { id: 'cascara', name: 'Cascara fizz', category: 'Cold', price: 3.9, notes: 'Coffee cherry tea, sparkling water, a little honey.', liquid: '#9E2B25', foam: '#D7685E', iced: true },
]

// Drinks offered in the 3D hero switcher.
export const heroDrinks = ['espresso', 'flat-white', 'ceremonial', 'iced-matcha'].map((id) =>
  menu.find((m) => m.id === id),
)
