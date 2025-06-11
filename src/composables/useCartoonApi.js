import { ref } from 'vue';

export function useCartoonApi() {
  const cartoons = ref([]);

  const fetchCartoons = async () => {
    try {
      const res = await fetch('https://dee9000.github.io/retro-cartoon-data/cartoons.json');
      if (!res.ok) throw new Error('Failed to load cartoons');
      cartoons.value = await res.json();
    } catch (err) {
      console.error('Error fetching cartoons:', err);
    }
  };

  return { cartoons, fetchCartoons };
}
