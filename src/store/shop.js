import { products } from '../assets/products';
import { reactive, ref,computed } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from './toast'
export const useShop = defineStore('shop', () => {


const categories = reactive([
    { name: 'Electronics', count: 10 },
    { name: 'Clothing', count: 8 },
    { name: 'Books', count: 5 },
    { name: 'Kitchen', count: 12 },
    { name: 'Sports', count: 7 },
    { name: 'Toys', count: 4 },
    { name: 'womens', count: 6 },
    { name: 'Mens', count: 3 },
])

const brands = reactive([
    { name: 'Apple', count: 10 },
    { name: 'Samsung', count: 8 },
    { name: 'Sony', count: 5 },
    { name: 'LG', count: 12 },
])


const searchCategoryQuery = ref("");
const searchBrandQuery = ref("");

const selectedCategoryFilter= ref([]);
const selectedBrandFilter= ref([]);

const searchCategories = computed(() => {
  return categories.filter((cat) => {
    return cat.name.toLowerCase().match(searchCategoryQuery.value.toLowerCase());
  });
});
 
const searchBrands = computed(() => {
  return brands.filter((brand) => {
    return brand.name.toLowerCase().match(searchBrandQuery.value.toLowerCase());
  });
});
  
const filterProducts = computed(() => {
  let filtered = products;
  if (selectedCategoryFilter.value.length > 0) {
    const terms = selectedCategoryFilter.value.map(t => t.toLowerCase().trim());
    // const matchTerm = (term, kw) => kw.toLowerCase().includes(term);
    const matchTerm = (term, kw) => kw === term 

    filtered = filtered.filter((product) => {
       const kws = (product.keywords || []).map(k => k.toLowerCase());
      return terms.some(term => kws.some(kw => matchTerm(term, kw)));
    });
  }
  if (selectedBrandFilter.value.length > 0) {
    filtered = filtered.filter((product) =>
      selectedBrandFilter.value.includes(product.brand)
    );
  }
  return filtered;
});

const filterProductsByKeywords = (keywords, options = {}) => {
  const terms = Array.isArray(keywords)
    ? keywords.map(t => String(t).toLowerCase().trim()).filter(Boolean)
    : String(keywords).toLowerCase().split(/[\s,]+/).filter(Boolean);

  console.log('Filtering products by keywords:', terms);

  return products.filter(p => {
    const kws = (p.keywords || []).map(k => k.toLowerCase());
    if (terms.length === 0) return true;

    return terms.some(term => kws.some(kw => kw.includes(term)));
  });
}

// --- Cart state and helpers ---
const CART_KEY = 'myshop_cart_v1';
const cart = ref([]);

// Toasts
const toast = useToast();

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (raw) cart.value = JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to load cart from localStorage', e);
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart.value));
  } catch (e) {
    console.warn('Failed to save cart to localStorage', e);
  }
}

loadCart();

const cartItems = computed(() => cart.value);
const cartCount = computed(() => cart.value.reduce((sum, li) => sum + (li.quantity || 0), 0));
const cartSubtotalCents = computed(() => cart.value.reduce((sum, li) => sum + (li.quantity || 0) * (li.priceCents || 0), 0));

function _makeItemId(product, options = {}) {
  // Create a stable id for cart items that includes selected options
  try {
    return `${product.id}::${JSON.stringify(options)}`;
  } catch (e) {
    return `${product.id}::${String(options)}`;
  }
}

function addToCart(product, qty = 1, options = {}) {
  const id = _makeItemId(product, options);
  const existing = cart.value.find(i => i.id === id);
  if (existing) {
    existing.quantity = (existing.quantity || 0) + qty;
    toast.show(`Added another ${product.name} to cart`);
  } else {
    cart.value.push({ id, product, quantity: qty, priceCents: product.priceCents, selectedOptions: options });
    toast.show(`Added ${product.name} to cart`);
  }
  saveCart();
}

function removeFromCart(productId) {
  const item = cart.value.find(i => i.id === productId);
  if (item) toast.show(`Removed ${item.product.name} from cart`, 'info');
  cart.value = cart.value.filter(i => i.id !== productId);
  saveCart();
}

function updateCartQuantity(productId, quantity) {
  const item = cart.value.find(i => i.id === productId);
  if (!item) return;
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  item.quantity = quantity;
  saveCart();
}

function clearCart() {
  cart.value = [];
  saveCart();
  toast.show('Cart cleared', 'info');
}

  return { brands, categories,searchBrandQuery, searchCategoryQuery, selectedCategoryFilter, selectedBrandFilter, searchCategories,searchBrands,filterProducts,filterProductsByKeywords, cartItems, cartCount, cartSubtotalCents, addToCart, removeFromCart, updateCartQuantity, clearCart }
})