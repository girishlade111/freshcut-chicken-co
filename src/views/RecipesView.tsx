import React, { useState } from 'react';
import { ChefHat, Clock, Users, Flame, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { RECIPES } from '../data/mockData';
import { Recipe } from '../types';
import { useRatesStore } from '../store/useRatesStore';
import { useCartStore } from '../store/useCartStore';
import { useLanguage } from '../i18n/LanguageContext';
import { Button } from '../components/ui/Button';

interface RecipesViewProps {
  initialSlug?: string;
  onNavigate: (view: string, param?: string) => void;
}

export const RecipesView: React.FC<RecipesViewProps> = ({ initialSlug, onNavigate }) => {
  const { products } = useRatesStore();
  const { addItem, openCart } = useCartStore();
  const { language } = useLanguage();

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(
    RECIPES.find((r) => r.slug === initialSlug) || RECIPES[0]
  );
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [addedItem, setAddedItem] = useState(false);

  const filteredRecipes =
    activeFilter === 'all'
      ? RECIPES
      : RECIPES.filter((r) =>
          activeFilter === 'curry'
            ? r.slug.includes('rassa') || r.slug.includes('handi')
            : activeFilter === 'dry'
            ? r.slug.includes('sukka') || r.slug.includes('tandoori') || r.slug.includes('pepper')
            : r.slug.includes('biryani')
        );

  const linkedIngredient = selectedRecipe.ingredients.find((ing) => ing.linkedProductId);
  const linkedProduct = linkedIngredient
    ? products.find((p) => p.id === linkedIngredient.linkedProductId) || products[0]
    : products[0];

  const handleAddMeatForRecipe = () => {
    if (linkedProduct) {
      addItem(linkedProduct, 750, 'Curry Cut', 'with_skin');
      setAddedItem(true);
      setTimeout(() => {
        setAddedItem(false);
        openCart();
      }, 600);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-[#EBF3EE] text-[#2F5D46] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <ChefHat className="w-4 h-4" />
          <span>Regional Butchery & Culinary Kitchen</span>
        </div>
        <h1 className="font-serif-display font-bold text-3xl md:text-5xl text-[#1B1512]">
          Recipes from the Master Butcher's Table
        </h1>
        <p className="text-xs sm:text-sm text-[#5E524C]">
          Tested recipes designed specifically around authentic meat cuts, collagen extraction, and deep spice absorption.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2">
        {[
          { id: 'all', label: 'All Recipes' },
          { id: 'curry', label: 'Rassa & Curries' },
          { id: 'dry', label: 'Sukka & Roasts' },
          { id: 'biryani', label: 'Biryani Specials' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === tab.id
                ? 'bg-[#1B1512] text-white'
                : 'bg-white border border-[#1B1512]/15 text-[#5E524C] hover:bg-[#1B1512]/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Selected Recipe Featured Stage */}
      <div className="bg-white rounded-3xl border border-[#1B1512]/15 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Recipe Visual & Meat Addon Box */}
        <div className="lg:col-span-5 p-6 md:p-8 bg-[#FBF6EE] flex flex-col justify-between space-y-6 border-b lg:border-b-0 lg:border-r border-[#1B1512]/10">
          <div className="space-y-4">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#F4ECE0] border border-[#1B1512]/10">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#1B1512]/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-xs font-semibold">
                {selectedRecipe.difficulty}
              </div>
            </div>

            <div>
              <h2 className="font-serif-display font-bold text-2xl text-[#1B1512]">
                {language === 'mr' ? selectedRecipe.titleMr : selectedRecipe.titleEn}
              </h2>
              <p className="text-xs text-[#5E524C] mt-1 italic">
                "{selectedRecipe.tagline}"
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-[#1B1512] py-2 border-y border-[#1B1512]/10">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#F2A33A]" />
                <span>Prep: {selectedRecipe.prepTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#C8262B]" />
                <span>Cook: {selectedRecipe.cookTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#2F5D46]" />
                <span>Serves: {selectedRecipe.servings}</span>
              </div>
            </div>
          </div>

          {/* 1-Click Recipe Cut Bundle */}
          {linkedProduct && (
            <div className="bg-white p-4 rounded-2xl border border-[#C8262B]/30 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#C8262B]">
                <Sparkles className="w-4 h-4" />
                <span>Recommended Meat for this Dish</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#1B1512]">{linkedProduct.nameEn}</div>
                  <div className="text-[11px] text-[#5E524C]">Fresh Bone-In Curry Cut</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#C8262B]">₹{linkedProduct.pricePerKg}/kg</div>
                </div>
              </div>
              <Button
                fullWidth
                variant={addedItem ? 'secondary' : 'primary'}
                size="sm"
                onClick={handleAddMeatForRecipe}
                icon={addedItem ? <Check className="w-3.5 h-3.5 text-[#2F5D46]" /> : <ShoppingBag className="w-3.5 h-3.5" />}
              >
                {addedItem ? 'Meat Added to Bag' : 'Add 750g Meat for this Recipe'}
              </Button>
            </div>
          )}
        </div>

        {/* Right: Ingredients & Cooking Steps */}
        <div className="lg:col-span-7 p-6 md:p-8 space-y-6">
          {/* Ingredients List */}
          <div>
            <h3 className="font-serif-display font-bold text-lg text-[#1B1512] mb-3">
              Ingredients Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {selectedRecipe.ingredients.map((ing, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 bg-[#FBF6EE] rounded-xl border border-[#1B1512]/5 text-[#1B1512]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8262B]" />
                  <span>
                    <b className="font-semibold">{ing.amount}</b>{' '}
                    {language === 'mr' ? ing.nameMr : ing.nameEn}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="space-y-3">
            <h3 className="font-serif-display font-bold text-lg text-[#1B1512]">
              Butcher's Step-by-Step Method
            </h3>
            <div className="space-y-3 text-xs leading-relaxed text-[#5E524C]">
              {selectedRecipe.steps.map((step, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-[#1B1512] text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="pt-0.5 text-[#1B1512]">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Other Recipes */}
      <div className="space-y-4">
        <h3 className="font-serif-display font-bold text-xl text-[#1B1512]">
          More Curries & Grills
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((r) => (
            <div
              key={r.id}
              onClick={() => {
                setSelectedRecipe(r);
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
              className={`bg-white rounded-2xl border p-4 cursor-pointer transition-all ${
                selectedRecipe.id === r.id
                  ? 'border-[#C8262B] ring-2 ring-[#C8262B]/20 shadow-md'
                  : 'border-[#1B1512]/10 hover:border-[#1B1512]/30'
              }`}
            >
              <div className="aspect-16/10 rounded-xl overflow-hidden bg-[#F4ECE0] mb-3">
                <img src={r.image} alt={r.titleEn} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-serif-display font-bold text-base text-[#1B1512]">
                {language === 'mr' ? r.titleMr : r.titleEn}
              </h4>
              <p className="text-xs text-[#5E524C] line-clamp-1 mt-1">{r.tagline}</p>
              <div className="mt-2 text-[11px] font-bold text-[#C8262B]">
                Cook this recipe →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
