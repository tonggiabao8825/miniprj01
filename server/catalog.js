export const categories = [
  { id: 'all', name: 'Tất cả' },
  { id: 'moisturizer', name: 'Kem dưỡng ẩm' },
  { id: 'lipstick', name: 'Son môi' },
  { id: 'nails', name: 'Sơn móng tay' },
  { id: 'makeup', name: 'Trang điểm' },
  { id: 'hair', name: 'Dưỡng tóc' },
];

export const products = [
  { id: 'itachi', name: 'Son môi itachi', price: 500000, originalPrice: 600000, badge: '-17%', category: 'lipstick', file: 'pr8_master.jpg' },
  { id: 'mascara', name: 'Mascara dày và cong', price: 50000, originalPrice: 100000, badge: '-50%', category: 'makeup', file: 'pr9_80450716-2b66-4b4b-76ed-5c1534a804fa_master.jpg' },
  { id: 'tpa-115', name: 'Son môi TPA-115', price: 125000, originalPrice: 250000, badge: '-50%', category: 'lipstick', file: 'pr10_18fd8cae-14f6-4d70-40b5-5fde4db1df12_master.jpg' },
  { id: 'pink-lip', name: 'Son bóng hồng', price: 100000, originalPrice: 200000, badge: '-50%', category: 'lipstick', file: 'pr11_40e951b1-7be3-4f65-4bb8-fc9c1902e6d1_master.jpg' },
  { id: 'sg', name: 'Nước làm trắng da SG', price: 200000, originalPrice: null, badge: 'HOT', category: 'moisturizer', file: 'pr12_6e6ab775-622b-43ae-43c9-08796dd0c9e2_master.jpg' },
  { id: 'aug', name: 'Phấn trang điểm AUG', price: 400000, originalPrice: 450000, badge: '-11%', category: 'makeup', file: 'pr23_d88c715b-a920-42e1-613e-7d7ba1317762_master.jpg' },
];

export const brands = ['Duluz', 'Matt Guitars', 'Burberry London', 'Handcrafted', 'Jolylife', 'Adventure'].map((name, index) => ({
  id: `brand-${index + 1}`, name, image: `/api/images/brand-${index + 1}`,
}));

// Only known image IDs are exposed; client input never becomes a filesystem path.
export const images = new Map([
  ...products.map(({ id, file }) => [id, `Images/products/${file}`]),
  ...brands.map(({ id }, index) => [id, `Images/partner_img_${index + 1}.png`]),
  ['banner', 'Images/tabs_2_slider_img_3.jpg'],
  ['heart', 'node_modules/ionicons/dist/svg/heart.svg'],
]);