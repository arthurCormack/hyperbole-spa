import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const selectHomeHeroes = () => createSelector(
  selectHome,
  (homeState) => {
    // if (!homeState) return false;
    // console.log(`selectHomeHeroes()`, homeState);
    // if (typeof homeState === 'undefined') return false;
    let homeHeroes = homeState.get('homeHeroes');

    // console.log(`selectHomeHeroes()`, homeState, homeHeroes);// undefined?!
    // if (typeof homeHeros.toJS === 'function') {
    //   return homeHeros.toJS();
    // }

    return homeHeroes;
  }
);
//
const selectHomeHeroItems = () => createSelector(
  selectHomeHeroes(),
  (homeHeroes) => {
    // console.log(`$$$selectHomeHeroItems()`, homeHeroes);
    //if (!homeHeroes) return [];

    // if (typeof homeHeroes.items === 'undefined') return [];
    // return homeHeroes.items;

    // const homeHeros = homeState.get('homeHeros');
    // if (typeof homeHeros.toJS === 'function') {
    //   return homeHeros.toJS();
    // }
    // return homeHeros.items;
    if (homeHeroes) {
      if (typeof homeHeroes.toJS === 'function') {
        return homeHeroes.get('items');
      } else {
        return homeHeroes.items;
      }

    }
    return false;
  }
);

 export default selectHomeHeroItems;
 export {
   selectHomeHeroes,
   selectHomeHeroItems,
 };
