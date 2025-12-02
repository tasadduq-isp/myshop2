import { products } from '../assets/products';
import { reactive, ref,computed } from 'vue'
import { defineStore } from 'pinia'
export const useShop = defineStore('shop', () => {


const categories = reactive([
    { name: 'Electronics', count: 10 },
    { name: 'Clothing', count: 8 },
    { name: 'Books', count: 5 },
    { name: 'Kitchen', count: 12 },
    { name: 'Sports', count: 7 },
    { name: 'Toys', count: 4 },
    { name: 'women', count: 6 },
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
    const matchTerm = (term, kw) => kw.toLowerCase().includes(term);

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

const filterProductsByKeywords = (keywords, options = { exact: false, matchAll: false }) => {
  
   const terms = Array.isArray(keywords)
    ? keywords.map(t => String(t).toLowerCase().trim()).filter(Boolean)
    : String(keywords).toLowerCase().split(/[\s,]+/).filter(Boolean);
    
    const matchTerm = options.exact
    ? (term, kw) => kw === term
    : (term, kw) => kw.includes(term);

  return products1.filter(p => {
    const kws = (p.keywords || []).map(k => k.toLowerCase());
    if (options.matchAll) {
      return terms.every(term => kws.some(kw => matchTerm(term, kw)));
    } else {
      return terms.some(term => kws.some(kw => matchTerm(term, kw)));
    }
  });
}

  return { brands, categories,searchBrandQuery, searchCategoryQuery, selectedCategoryFilter, selectedBrandFilter, searchCategories,searchBrands,filterProducts,filterProductsByKeywords }
})