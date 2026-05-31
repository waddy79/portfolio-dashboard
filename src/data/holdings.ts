// 100 open equity positions
// Crypto ETPs excluded — see /crypto page for crypto holdings
import type { Holding } from "./types";

export const holdings: Holding[] = [
  // ── Technology ───────────────────────────────────────────────────────────
  { ticker: "GOOGL",  name: "Alphabet (Class A)",            sector: "Technology" },
  { ticker: "AMZN",   name: "Amazon",                        sector: "Technology" },
  { ticker: "NVDA",   name: "Nvidia",                        sector: "Technology" },
  { ticker: "META",   name: "Meta Platforms",                sector: "Technology" },
  { ticker: "TSLA",   name: "Tesla",                         sector: "Technology" },
  { ticker: "PLTR",   name: "Palantir",                      sector: "Technology" },
  { ticker: "CRWV",   name: "CoreWeave",                     sector: "Technology" },
  { ticker: "NBIS",   name: "Nebius Group NV",               sector: "Technology" },
  { ticker: "MU",     name: "Micron Technology",             sector: "Technology" },
  { ticker: "AMKR",   name: "Amkor Technology",              sector: "Technology" },
  { ticker: "AVGO",   name: "Broadcom",                      sector: "Technology" },
  { ticker: "AMAT",   name: "Applied Materials",             sector: "Technology" },
  { ticker: "STM",    name: "STMicroelectronics",            sector: "Technology" },
  { ticker: "VRT",    name: "Vertiv",                        sector: "Technology" },
  { ticker: "SYM",    name: "Symbotic",                      sector: "Technology" },
  { ticker: "CGNX",   name: "Cognex",                        sector: "Technology" },
  { ticker: "ZBRA",   name: "Zebra Technologies",            sector: "Technology" },
  { ticker: "TER",    name: "Teradyne",                      sector: "Technology" },
  { ticker: "IBM",    name: "IBM",                           sector: "Technology" },
  { ticker: "FORM",   name: "FormFactor",                    sector: "Technology" },
  { ticker: "REL",    name: "RELX",      yahooTicker: "REL.L",   sector: "Technology" },
  { ticker: "IONQ",   name: "IonQ",                          sector: "Technology" },
  { ticker: "QBTS",   name: "D-Wave Quantum",                sector: "Technology" },
  { ticker: "QUBT",   name: "Quantum Computing",             sector: "Technology" },
  { ticker: "RGTI",   name: "Rigetti Computing",             sector: "Technology" },
  { ticker: "ROK",    name: "Rockwell Automation",           sector: "Technology" },

  // ── Aerospace & Defense ──────────────────────────────────────────────────
  { ticker: "RR",     name: "Rolls-Royce",     yahooTicker: "RR.L",   sector: "Aerospace & Defense" },
  { ticker: "RKLB",   name: "Rocket Lab",                    sector: "Aerospace & Defense" },
  { ticker: "BA",     name: "BAE Systems",     yahooTicker: "BA.L",   sector: "Aerospace & Defense" },
  { ticker: "NOC",    name: "Northrop Grumman",              sector: "Aerospace & Defense" },
  { ticker: "RTX",    name: "RTX Corp",                      sector: "Aerospace & Defense" },
  { ticker: "LMT",    name: "Lockheed Martin",               sector: "Aerospace & Defense" },
  { ticker: "GD",     name: "General Dynamics",              sector: "Aerospace & Defense" },
  { ticker: "LHX",    name: "L3Harris Technologies",         sector: "Aerospace & Defense" },
  { ticker: "LDOS",   name: "Leidos",                        sector: "Aerospace & Defense" },
  { ticker: "HWM",    name: "Howmet Aerospace",              sector: "Aerospace & Defense" },
  { ticker: "BWXT",   name: "BWX Technologies",              sector: "Aerospace & Defense" },
  { ticker: "FINMY",  name: "Leonardo",                      sector: "Aerospace & Defense" },
  { ticker: "RDW",    name: "Redwire",                       sector: "Aerospace & Defense" },
  { ticker: "BKSY",   name: "BlackSky Technology",           sector: "Aerospace & Defense" },
  { ticker: "ASTS",   name: "AST SpaceMobile",               sector: "Aerospace & Defense" },
  { ticker: "PL",     name: "Planet Labs",                   sector: "Aerospace & Defense" },
  { ticker: "SIDU",   name: "Sidus Space",                   sector: "Aerospace & Defense" },
  { ticker: "SPCE",   name: "Virgin Galactic",               sector: "Aerospace & Defense" },
  { ticker: "SPIR",   name: "Spire Global",                  sector: "Aerospace & Defense" },
  { ticker: "LUNR",   name: "Intuitive Machines",            sector: "Aerospace & Defense" },
  { ticker: "MDA",    name: "MDA Space",      yahooTicker: "MDA.TO", sector: "Aerospace & Defense" },
  { ticker: "VOYG",   name: "Voyager Technologies",          sector: "Aerospace & Defense" },
  { ticker: "FLY",    name: "Firefly Aerospace",             sector: "Aerospace & Defense" },
  { ticker: "SATS",   name: "EchoStar",                      sector: "Aerospace & Defense" },
  { ticker: "GSAT",   name: "Globalstar",                    sector: "Aerospace & Defense" },
  { ticker: "GILT",   name: "Gilat Satellite Networks",      sector: "Aerospace & Defense" },

  // ── Energy & Utilities ───────────────────────────────────────────────────
  { ticker: "SHEL",   name: "Shell",          yahooTicker: "SHEL.L", sector: "Energy & Utilities" },
  { ticker: "BP",     name: "BP",             yahooTicker: "BP.L",   sector: "Energy & Utilities" },
  { ticker: "ENR",    name: "Siemens Energy", yahooTicker: "ENR.DE", sector: "Energy & Utilities" },
  { ticker: "GEV",    name: "GE Vernova",                    sector: "Energy & Utilities" },
  { ticker: "BE",     name: "Bloom Energy",                  sector: "Energy & Utilities" },
  { ticker: "NG",     name: "National Grid",  yahooTicker: "NG.L",   sector: "Energy & Utilities" },
  { ticker: "SSE",    name: "SSE",            yahooTicker: "SSE.L",  sector: "Energy & Utilities" },
  { ticker: "UU",     name: "United Utilities", yahooTicker: "UU.L", sector: "Energy & Utilities" },

  // ── Finance ──────────────────────────────────────────────────────────────
  { ticker: "BARC",   name: "Barclays",       yahooTicker: "BARC.L", sector: "Finance" },
  { ticker: "HSBA",   name: "HSBC",           yahooTicker: "HSBA.L", sector: "Finance" },
  { ticker: "NWG",    name: "NatWest",        yahooTicker: "NWG.L",  sector: "Finance" },
  { ticker: "AV",     name: "Aviva",          yahooTicker: "AV.L",   sector: "Finance" },
  { ticker: "HOOD",   name: "Robinhood Markets",             sector: "Finance" },
  { ticker: "SDLF",   name: "Standard Life",  yahooTicker: "SDLF.L", sector: "Finance" },
  { ticker: "ASST",   name: "Strive",                        sector: "Finance" },

  // ── Healthcare ───────────────────────────────────────────────────────────
  { ticker: "AZN",    name: "AstraZeneca",    yahooTicker: "AZN.L",  sector: "Healthcare" },
  { ticker: "GSK",    name: "GSK",            yahooTicker: "GSK.L",  sector: "Healthcare" },
  { ticker: "DHR",    name: "Danaher",                       sector: "Healthcare" },
  { ticker: "BMY",    name: "Bristol-Myers Squibb",          sector: "Healthcare" },
  { ticker: "SYK",    name: "Stryker",                       sector: "Healthcare" },

  // ── Consumer ─────────────────────────────────────────────────────────────
  { ticker: "TSCO",   name: "Tesco",          yahooTicker: "TSCO.L", sector: "Consumer" },
  { ticker: "ULVR",   name: "Unilever",       yahooTicker: "ULVR.L", sector: "Consumer" },
  { ticker: "RKT",    name: "Reckitt Benckiser", yahooTicker: "RKT.L", sector: "Consumer" },
  { ticker: "IMB",    name: "Imperial Brands", yahooTicker: "IMB.L", sector: "Consumer" },
  { ticker: "CCH",    name: "Coca-Cola HBC",  yahooTicker: "CCH.L",  sector: "Consumer" },
  { ticker: "BAG",    name: "AG Barr",        yahooTicker: "BAG.L",  sector: "Consumer" },
  { ticker: "ABF",    name: "Associated British Foods", yahooTicker: "ABF.L", sector: "Consumer" },

  // ── Industrial ───────────────────────────────────────────────────────────
  { ticker: "HON",    name: "Honeywell International",       sector: "Industrial" },
  { ticker: "EMR",    name: "Emerson Electric",              sector: "Industrial" },
  { ticker: "RRX",    name: "Regal Rexnord",                 sector: "Industrial" },
  { ticker: "ABBN",   name: "ABB",            yahooTicker: "ABB",    sector: "Industrial" },
  { ticker: "INPST",  name: "InPost",         yahooTicker: "INPST.AS", sector: "Industrial" },
  { ticker: "PSIX",   name: "Power Solutions International", sector: "Industrial" },

  // ── Mining & Materials ───────────────────────────────────────────────────
  { ticker: "RIO",    name: "Rio Tinto",      yahooTicker: "RIO.L",  sector: "Mining & Materials" },
  { ticker: "BHP",    name: "BHP Group",      yahooTicker: "BHP.L",  sector: "Mining & Materials" },
  { ticker: "GLEN",   name: "Glencore",       yahooTicker: "GLEN.L", sector: "Mining & Materials" },
  { ticker: "NUE",    name: "Nucor",                         sector: "Mining & Materials" },
  { ticker: "STRC",   name: "Strategy (Preferred)",          sector: "Mining & Materials" },

  // ── Crypto & Digital ─────────────────────────────────────────────────────
  { ticker: "IREN",   name: "IREN",                          sector: "Crypto & Digital" },
  { ticker: "CLSK",   name: "CleanSpark",                    sector: "Crypto & Digital" },
  { ticker: "WULF",   name: "TeraWulf",                      sector: "Crypto & Digital" },

  // ── Telecoms ─────────────────────────────────────────────────────────────
  { ticker: "BT/A",   name: "BT Group",       yahooTicker: "BT-A.L", sector: "Telecoms" },

  // ── ETPs & Funds ─────────────────────────────────────────────────────────
  { ticker: "WREN",   name: "WisdomTree Renewable Energy",   yahooTicker: "WREN.L",  sector: "ETPs & Funds" },
  { ticker: "CHRG",   name: "WisdomTree Battery Solutions",  yahooTicker: "CHRG.L",  sector: "ETPs & Funds" },
  { ticker: "WREE",   name: "WisdomTree Strategic Metals & Rare Earths", yahooTicker: "WREE.L", sector: "ETPs & Funds" },
  { ticker: "FOGB",   name: "Rize Sustainable Future of Food", yahooTicker: "FOGB.L", sector: "ETPs & Funds" },
  { ticker: "NCLP",   name: "WisdomTree Uranium & Nuclear Energy", yahooTicker: "NCLP.L", sector: "ETPs & Funds" },
  { ticker: "WQTM",   name: "WisdomTree Quantum Computing",  yahooTicker: "WQTM.L",  sector: "ETPs & Funds" },
];
