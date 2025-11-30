import { products } from '../assets/products';
import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
export const useShop = defineStore('shop', () => {
  const products1 = reactive(products)

 
  
const filterProductsByKeywords = (keywords, options = { exact: false, matchAll: false }) => {
  
   const terms = Array.isArray(keywords)
    ? keywords.map(t => String(t).toLowerCase().trim()).filter(Boolean)
    : String(keywords).toLowerCase().split(/[\s,]+/).filter(Boolean);
    
    const matchTerm = options.exact
    ? (term, kw) => kw === term
    : (term, kw) => kw.includes(term);

  return products1.value.filter(p => {
    const kws = (p.keywords || []).map(k => k.toLowerCase());
    if (options.matchAll) {
      return terms.every(term => kws.some(kw => matchTerm(term, kw)));
    } else {
      return terms.some(term => kws.some(kw => matchTerm(term, kw)));
    }
  });
}

  return { products1, filterProductsByKeywords }
})