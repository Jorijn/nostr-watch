import { defineStore } from 'pinia'

export const useRelaysStore = defineStore('relays', {
  state: () => ({ 
    urls: new Array(),
    // results: new Object(),
    geo: new Object(),
    lastUpdate: null,
    count: new Object(),
    processing: false,
    processedRelays: new Array(),
    favorites: new Array(),
  }),
  getters: {
    getAll: (state) => state.urls, //clone it
    getByAggregate: (state) => (aggregate) => {
      return state.urls
              .filter( (relay) => state.results?.[relay]?.aggregate == aggregate)
    },

    // getResults: (state) => state.results,
    // getResult: (state) => (relayUrl) => state.results?.[relayUrl],
    
    getGeo: (state) => (relayUrl) => state.geo[relayUrl],

    getLastUpdate: (state) => state.lastUpdate,

    getCount: (state) => (type) => state.count[type],
    getCounts: (state) => state.count,

    getProcessedRelays: (state) => state.processedRelays,
    isProcessing: (state) => state.processing,

    getFavorites: (state) => state.favorites,
    isFavorite: (state) => (relayUrl) => state.favorites.includes(relayUrl)
  },
  actions: {
    addRelay(relayUrl){ this.urls.push(relayUrl) },
    addRelays(relayUrls){ this.urls = Array.from(new Set(this.urls.concat(this.urls, relayUrls))) },
    setRelays(relayUrls){ this.urls = relayUrls },

    // setResult(result){ 
    //   // this.setStat('relays', this.)
    //   this.results[result.uri] = result 
    // },
    // setResults(results){ this.results = results },
    // clearResults(){ this.results = {} },

    setGeo(geo){ this.geo = geo },

    updateNow(){ this.lastUpdate = Date.now() },

    setStat(type, value){ 
      this.count[type] = value 
    },
    
    addProcessedRelay(relay){
      console.log(`this.processedRelays is set`, this.processedRelays instanceof Set)
      this.processedRelays.push(relay) 
    },

    finishProcessing() { this.processing = false },
    startProcessing() { this.processing = true },
    completeProcessing() { 
      console.log('setting as complete')
      this.processedRelays = []
      this.finishProcessing()
    },

    setFavorite: (relayUrl) => { 
      this.favorites.push(relayUrl)
    }
  },
})