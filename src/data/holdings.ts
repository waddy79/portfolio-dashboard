// 100 open equity positions
// Crypto ETPs excluded — see /crypto page for crypto holdings
// avgBuyPrice = weighted average cost basis in native price currency (GBX for UK, USD/EUR/CAD as applicable)
import type { Holding } from "./types";

export const holdings: Holding[] = [
  // ── Technology ───────────────────────────────────────────────────────────
  { ticker: "GOOGL",  name: "Alphabet (Class A)",            sector: "Technology",           avgBuyPrice: 339.97  },
  { ticker: "AMZN",   name: "Amazon",                        sector: "Technology",           avgBuyPrice: 233.40  },
  { ticker: "NVDA",   name: "Nvidia",                        sector: "Technology",           avgBuyPrice: 205.44  },
  { ticker: "META",   name: "Meta Platforms",                sector: "Technology",           avgBuyPrice: 668.50  },
  { ticker: "TSLA",   name: "Tesla",                         sector: "Technology",           avgBuyPrice: 396.84  },
  { ticker: "PLTR",   name: "Palantir",                      sector: "Technology",           avgBuyPrice: 128.24  },
  { ticker: "CRWV",   name: "CoreWeave",                     sector: "Technology",           avgBuyPrice: 111.51  },
  { ticker: "NBIS",   name: "Nebius Group NV",               sector: "Technology",           avgBuyPrice: 109.90  },
  { ticker: "MU",     name: "Micron Technology",             sector: "Technology",           avgBuyPrice: 565.55  },
  { ticker: "AMKR",   name: "Amkor Technology",              sector: "Technology",           avgBuyPrice: 69.39   },
  { ticker: "AVGO",   name: "Broadcom",                      sector: "Technology",           avgBuyPrice: 388.46  },
  { ticker: "AMAT",   name: "Applied Materials",             sector: "Technology",           avgBuyPrice: 404.52  },
  { ticker: "STM",    name: "STMicroelectronics",            sector: "Technology",           avgBuyPrice: 63.57   },
  { ticker: "VRT",    name: "Vertiv",                        sector: "Technology",           avgBuyPrice: 268.37  },
  { ticker: "SYM",    name: "Symbotic",                      sector: "Technology",           avgBuyPrice: 54.79   },
  { ticker: "CGNX",   name: "Cognex",                        sector: "Technology",           avgBuyPrice: 67.79   },
  { ticker: "ZBRA",   name: "Zebra Technologies",            sector: "Technology",           avgBuyPrice: 252.93  },
  { ticker: "TER",    name: "Teradyne",                      sector: "Technology",           avgBuyPrice: 324.08  },
  { ticker: "IBM",    name: "IBM",                           sector: "Technology",           avgBuyPrice: 264.23  },
  { ticker: "FORM",   name: "FormFactor",                    sector: "Technology",           avgBuyPrice: 117.15  },
  { ticker: "REL",    name: "RELX",      yahooTicker: "REL.L",   sector: "Technology",      avgBuyPrice: 2512.82 },
  { ticker: "IONQ",   name: "IonQ",                          sector: "Technology",           avgBuyPrice: 60.55   },
  { ticker: "QBTS",   name: "D-Wave Quantum",                sector: "Technology",           avgBuyPrice: 29.26   },
  { ticker: "QUBT",   name: "Quantum Computing",             sector: "Technology",           avgBuyPrice: 12.62   },
  { ticker: "RGTI",   name: "Rigetti Computing",             sector: "Technology",           avgBuyPrice: 25.55   },
  { ticker: "ROK",    name: "Rockwell Automation",           sector: "Technology",           avgBuyPrice: 410.37  },

  // ── Aerospace & Defense ──────────────────────────────────────────────────
  { ticker: "RR",     name: "Rolls-Royce",     yahooTicker: "RR.L",   sector: "Aerospace & Defense",  avgBuyPrice: 1249.60  },
  { ticker: "RKLB",   name: "Rocket Lab",                    sector: "Aerospace & Defense",  avgBuyPrice: 84.44   },
  { ticker: "BA",     name: "BAE Systems",     yahooTicker: "BA.L",   sector: "Aerospace & Defense",  avgBuyPrice: 2157.36  },
  { ticker: "NOC",    name: "Northrop Grumman",              sector: "Aerospace & Defense",  avgBuyPrice: 617.73  },
  { ticker: "RTX",    name: "RTX Corp",                      sector: "Aerospace & Defense",  avgBuyPrice: 190.52  },
  { ticker: "LMT",    name: "Lockheed Martin",               sector: "Aerospace & Defense",  avgBuyPrice: 573.63  },
  { ticker: "GD",     name: "General Dynamics",              sector: "Aerospace & Defense",  avgBuyPrice: 343.19  },
  { ticker: "LHX",    name: "L3Harris Technologies",         sector: "Aerospace & Defense",  avgBuyPrice: 353.21  },
  { ticker: "LDOS",   name: "Leidos",                        sector: "Aerospace & Defense",  avgBuyPrice: 157.55  },
  { ticker: "HWM",    name: "Howmet Aerospace",              sector: "Aerospace & Defense",  avgBuyPrice: 259.52  },
  { ticker: "BWXT",   name: "BWX Technologies",              sector: "Aerospace & Defense",  avgBuyPrice: 204.84  },
  { ticker: "FINMY",  name: "Leonardo",                      sector: "Aerospace & Defense",  avgBuyPrice: 32.86   },
  { ticker: "RDW",    name: "Redwire",                       sector: "Aerospace & Defense",  avgBuyPrice: 11.21   },
  { ticker: "BKSY",   name: "BlackSky Technology",           sector: "Aerospace & Defense",  avgBuyPrice: 43.26   },
  { ticker: "ASTS",   name: "AST SpaceMobile",               sector: "Aerospace & Defense",  avgBuyPrice: 84.74   },
  { ticker: "PL",     name: "Planet Labs",                   sector: "Aerospace & Defense",  avgBuyPrice: 39.99   },
  { ticker: "SIDU",   name: "Sidus Space",                   sector: "Aerospace & Defense",  avgBuyPrice: 4.33    },
  { ticker: "SPCE",   name: "Virgin Galactic",               sector: "Aerospace & Defense",  avgBuyPrice: 2.88    },
  { ticker: "SPIR",   name: "Spire Global",                  sector: "Aerospace & Defense",  avgBuyPrice: 20.59   },
  { ticker: "LUNR",   name: "Intuitive Machines",            sector: "Aerospace & Defense",  avgBuyPrice: 26.04   },
  { ticker: "MDA",    name: "MDA Space",      yahooTicker: "MDA.TO", sector: "Aerospace & Defense",   avgBuyPrice: 46.58   },
  { ticker: "VOYG",   name: "Voyager Technologies",          sector: "Aerospace & Defense",  avgBuyPrice: 43.59   },
  { ticker: "FLY",    name: "Firefly Aerospace",             sector: "Aerospace & Defense",  avgBuyPrice: 48.38   },
  { ticker: "SATS",   name: "EchoStar",                      sector: "Aerospace & Defense",  avgBuyPrice: 133.24  },
  { ticker: "GSAT",   name: "Globalstar",                    sector: "Aerospace & Defense",  avgBuyPrice: 80.00   },
  { ticker: "GILT",   name: "Gilat Satellite Networks",      sector: "Aerospace & Defense",  avgBuyPrice: 18.65   },

  // ── Energy & Utilities ───────────────────────────────────────────────────
  { ticker: "SHEL",   name: "Shell",          yahooTicker: "SHEL.L", sector: "Energy & Utilities",   avgBuyPrice: 3092.15 },
  { ticker: "BP",     name: "BP",             yahooTicker: "BP.L",   sector: "Energy & Utilities",   avgBuyPrice: 566.45  },
  { ticker: "ENR",    name: "Siemens Energy", yahooTicker: "ENR.DE", sector: "Energy & Utilities",   avgBuyPrice: 165.39  },
  { ticker: "GEV",    name: "GE Vernova",                    sector: "Energy & Utilities",   avgBuyPrice: 917.89  },
  { ticker: "BE",     name: "Bloom Energy",                  sector: "Energy & Utilities",   avgBuyPrice: 199.58  },
  { ticker: "NG",     name: "National Grid",  yahooTicker: "NG.L",   sector: "Energy & Utilities",   avgBuyPrice: 1314.90 },
  { ticker: "SSE",    name: "SSE",            yahooTicker: "SSE.L",  sector: "Energy & Utilities",   avgBuyPrice: 2635.55 },
  { ticker: "UU",     name: "United Utilities", yahooTicker: "UU.L", sector: "Energy & Utilities",   avgBuyPrice: 1365.76 },

  // ── Finance ──────────────────────────────────────────────────────────────
  { ticker: "BARC",   name: "Barclays",       yahooTicker: "BARC.L", sector: "Finance",              avgBuyPrice: 437.55  },
  { ticker: "HSBA",   name: "HSBC",           yahooTicker: "HSBA.L", sector: "Finance",              avgBuyPrice: 1246.24 },
  { ticker: "NWG",    name: "NatWest",        yahooTicker: "NWG.L",  sector: "Finance",              avgBuyPrice: 563.59  },
  { ticker: "AV",     name: "Aviva",          yahooTicker: "AV.L",   sector: "Finance",              avgBuyPrice: 631.51  },
  { ticker: "HOOD",   name: "Robinhood Markets",             sector: "Finance",              avgBuyPrice: 85.65   },
  { ticker: "SDLF",   name: "Standard Life",  yahooTicker: "SDLF.L", sector: "Finance",              avgBuyPrice: 706.71  },
  { ticker: "ASST",   name: "Strive",                        sector: "Finance",              avgBuyPrice: 17.66   },

  // ── Healthcare ───────────────────────────────────────────────────────────
  { ticker: "AZN",    name: "AstraZeneca",    yahooTicker: "AZN.L",  sector: "Healthcare",           avgBuyPrice: 14160.56 },
  { ticker: "GSK",    name: "GSK",            yahooTicker: "GSK.L",  sector: "Healthcare",           avgBuyPrice: 1957.69 },
  { ticker: "DHR",    name: "Danaher",                       sector: "Healthcare",           avgBuyPrice: 165.32  },
  { ticker: "BMY",    name: "Bristol-Myers Squibb",          sector: "Healthcare",           avgBuyPrice: 61.49   },
  { ticker: "SYK",    name: "Stryker",                       sector: "Healthcare",           avgBuyPrice: 363.65  },

  // ── Consumer ─────────────────────────────────────────────────────────────
  { ticker: "TSCO",   name: "Tesco",          yahooTicker: "TSCO.L", sector: "Consumer",             avgBuyPrice: 473.65  },
  { ticker: "ULVR",   name: "Unilever",       yahooTicker: "ULVR.L", sector: "Consumer",             avgBuyPrice: 4468.71 },
  { ticker: "RKT",    name: "Reckitt Benckiser", yahooTicker: "RKT.L", sector: "Consumer",           avgBuyPrice: 4882.22 },
  { ticker: "IMB",    name: "Imperial Brands", yahooTicker: "IMB.L", sector: "Consumer",             avgBuyPrice: 3039.06 },
  { ticker: "CCH",    name: "Coca-Cola HBC",  yahooTicker: "CCH.L",  sector: "Consumer",             avgBuyPrice: 4397.14 },
  { ticker: "BAG",    name: "AG Barr",        yahooTicker: "BAG.L",  sector: "Consumer",             avgBuyPrice: 644.98  },
  { ticker: "ABF",    name: "Associated British Foods", yahooTicker: "ABF.L", sector: "Consumer",    avgBuyPrice: 1846.23 },

  // ── Industrial ───────────────────────────────────────────────────────────
  { ticker: "HON",    name: "Honeywell International",       sector: "Industrial",           avgBuyPrice: 221.26  },
  { ticker: "EMR",    name: "Emerson Electric",              sector: "Industrial",           avgBuyPrice: 137.93  },
  { ticker: "RRX",    name: "Regal Rexnord",                 sector: "Industrial",           avgBuyPrice: 209.23  },
  { ticker: "ABBN",   name: "ABB",            yahooTicker: "ABB",    sector: "Industrial"                        },
  { ticker: "INPST",  name: "InPost",         yahooTicker: "INPST.AS", sector: "Industrial", avgBuyPrice: 15.32  },
  { ticker: "PSIX",   name: "Power Solutions International", sector: "Industrial",           avgBuyPrice: 40.90   },

  // ── Mining & Materials ───────────────────────────────────────────────────
  { ticker: "RIO",    name: "Rio Tinto",      yahooTicker: "RIO.L",  sector: "Mining & Materials",   avgBuyPrice: 6847.45 },
  { ticker: "BHP",    name: "BHP Group",      yahooTicker: "BHP.L",  sector: "Mining & Materials",   avgBuyPrice: 3324.00 },
  { ticker: "GLEN",   name: "Glencore",       yahooTicker: "GLEN.L", sector: "Mining & Materials",   avgBuyPrice: 533.74  },
  { ticker: "NUE",    name: "Nucor",                         sector: "Mining & Materials",   avgBuyPrice: 233.48  },
  { ticker: "STRC",   name: "Strategy (Preferred)",          sector: "Mining & Materials",   avgBuyPrice: 100.15  },

  // ── Crypto & Digital ─────────────────────────────────────────────────────
  { ticker: "IREN",   name: "IREN",                          sector: "Crypto & Digital",     avgBuyPrice: 46.85   },
  { ticker: "CLSK",   name: "CleanSpark",                    sector: "Crypto & Digital",     avgBuyPrice: 17.92   },
  { ticker: "WULF",   name: "TeraWulf",                      sector: "Crypto & Digital",     avgBuyPrice: 16.75   },

  // ── Telecoms ─────────────────────────────────────────────────────────────
  { ticker: "BT/A",   name: "BT Group",       yahooTicker: "BT-A.L", sector: "Telecoms",             avgBuyPrice: 217.67  },

  // ── ETPs & Funds ─────────────────────────────────────────────────────────
  { ticker: "WREN",   name: "WisdomTree Renewable Energy",   yahooTicker: "WREN.L",  sector: "ETPs & Funds",  avgBuyPrice: 2268.03 },
  { ticker: "CHRG",   name: "WisdomTree Battery Solutions",  yahooTicker: "CHRG.L",  sector: "ETPs & Funds",  avgBuyPrice: 4039.74 },
  { ticker: "WREE",   name: "WisdomTree Strategic Metals & Rare Earths", yahooTicker: "WREE.L", sector: "ETPs & Funds", avgBuyPrice: 4605.24 },
  { ticker: "FOGB",   name: "Rize Sustainable Future of Food", yahooTicker: "FOGB.L", sector: "ETPs & Funds", avgBuyPrice: 303.05  },
  { ticker: "NCLP",   name: "WisdomTree Uranium & Nuclear Energy", yahooTicker: "NCLP.L", sector: "ETPs & Funds", avgBuyPrice: 4774.99 },
  { ticker: "WQTM",   name: "WisdomTree Quantum Computing",  yahooTicker: "WQTM.L",  sector: "ETPs & Funds",  avgBuyPrice: 40.24   },
];
