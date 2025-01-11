import type { IProductType } from "~/jsclient/interfaces/product";

const groups: {
  [key: string]: {
    code: IProductType;
    schema: string;
    subs: { [key: string]: { schema: string } };
  };
} = {
  food_beverages_tobacco: {
    code: "food_beverages_tobacco",
    schema: "http://schema.org/FoodEstablishment",
    subs: {
      food_beverages_tobacco: {
        schema: "http://schema.org/FoodEstablishment",
      },
      agriculture_produce: {
        schema: "http://schema.org/AgriculturalBusiness",
      },
      beer_wine: {
        schema: "http://schema.org/Brewery",
      },
      beverages_liquor: {
        schema: "http://schema.org/BeverageStore",
      },
      candy_chocolate: {
        schema: "http://schema.org/FoodEstablishment",
      },
      bakery_pastry: {
        schema: "http://schema.org/Bakery",
      },
      coffee_tea: {
        schema: "http://schema.org/CafeOrCoffeeShop",
      },
      lunch_catering: {
        schema: "http://schema.org/CateringBusiness",
      },
      grocery_stores_markets: {
        schema: "http://schema.org/GroceryStore",
      },
      asian_grocery_stores: {
        schema: "http://schema.org/GroceryStore",
      },
      fruits_vegetables: {
        schema: "http://schema.org/FoodEstablishment",
      },
      food_production: {
        schema: "http://schema.org/FoodProduction",
      },
      smoking_tobacco: {
        schema: "http://schema.org/Store",
      },
      meat_seafood_eggs: {
        schema: "http://schema.org/Butcher",
      },
    },
  },
  animals_pets: {
    code: "animals_pets",
    schema: "http://schema.org/PetStore",
    subs: {
      animals_pets: { schema: "http://schema.org/FoodEstablishment" },
      pet_stores: {
        schema: "http://schema.org/PetStore",
      },
      cats_dogs: {
        schema: "http://schema.org/AnimalShelter",
      },
      horses_riding: {
        schema: "http://schema.org/SportsActivityLocation",
      },
      animal_parks_zoo: {
        schema: "http://schema.org/Zoo",
      },
      animal_health: {
        schema: "http://schema.org/VeterinaryCare",
      },
      pet_services: {
        schema: "http://schema.org/PetCare",
      },
    },
  },
  money_insurance: {
    code: "money_insurance",
    schema: "http://schema.org/FinancialService",
    subs: {
      money_insurance: { schema: "http://schema.org/FoodEstablishment" },
      insurance: {
        schema: "http://schema.org/InsuranceAgency",
      },
      banking_money: {
        schema: "http://schema.org/BankOrCreditUnion",
      },
      accounting_tax: {
        schema: "http://schema.org/AccountingService",
      },
      real_estate: {
        schema: "http://schema.org/RealEstateAgent",
      },
      investments_wealth: {
        schema: "http://schema.org/InvestmentOrDeposit",
      },
      credit_debt_services: {
        schema: "http://schema.org/FinancialService",
      },
    },
  },
  beauty_wellbeing: {
    code: "beauty_wellbeing",
    schema: "http://schema.org/HealthAndBeautyBusiness",
    subs: {
      beauty_wellbeing: { schema: "http://schema.org/FoodEstablishment" },
      wellness_spa: {
        schema: "http://schema.org/HealthAndBeautyBusiness",
      },
      personal_care: {
        schema: "http://schema.org/BeautySalon",
      },
      cosmetics_makeup: {
        schema: "http://schema.org/BeautySalon",
      },
      salons_clinics: {
        schema: "http://schema.org/BeautySalon",
      },
      hair_care_styling: {
        schema: "http://schema.org/HairSalon",
      },
      tattoos_piercings: {
        schema: "http://schema.org/TattooParlor",
      },
      yoga_meditation: {
        schema: "http://schema.org/HealthAndBeautyBusiness",
      },
    },
  },
  construction_manufactoring: {
    code: "construction_manufactoring",
    schema: "http://schema.org/HomeAndConstructionBusiness",
    subs: {
      construction_manufactoring: {
        schema: "http://schema.org/FoodEstablishment",
      },
      architects_engineers: {
        schema: "http://schema.org/ProfessionalService",
      },
      contractors_consultants: {
        schema: "http://schema.org/ProfessionalService",
      },
      factory_equipment: {
        schema: "http://schema.org/ProfessionalService",
      },
      manufacturing: {
        schema: "http://schema.org/ManufacturingBusiness",
      },
      industrial_supplies: {
        schema: "http://schema.org/Store",
      },
      garden_landscaping: {
        schema: "http://schema.org/GardenStore",
      },
      building_materials: {
        schema: "http://schema.org/HardwareStore",
      },
      tools_equipment: {
        schema: "http://schema.org/HardwareStore",
      },
      chemicals_plastic: {
        schema: "http://schema.org/Business",
      },
      construction_services: {
        schema: "http://schema.org/HomeAndConstructionBusiness",
      },
      production_services: {
        schema: "http://schema.org/Business",
      },
    },
  },
  education_training: {
    code: "education_training",
    schema: "http://schema.org/EducationalOrganization",
    subs: {
      education_training: { schema: "http://schema.org/FoodEstablishment" },
      language_learning: {
        schema: "http://schema.org/EducationalOrganization",
      },
      colleges_universities: {
        schema: "http://schema.org/CollegeOrUniversity",
      },
      music_theater_classes: {
        schema: "http://schema.org/MusicGroup",
      },
      school_high_school: {
        schema: "http://schema.org/HighSchool",
      },
      specials_schools: {
        schema: "http://schema.org/EducationalOrganization",
      },
      vocational_training: {
        schema: "http://schema.org/EducationalOrganization",
      },
      courses_classes: {
        schema: "http://schema.org/Course",
      },
      education_services: {
        schema: "http://schema.org/EducationalOrganization",
      },
    },
  },
  electronics_technology: {
    code: "electronics_technology",
    schema: "http://schema.org/ElectronicsStore",
    subs: {
      electronics_technology: {
        schema: "http://schema.org/FoodEstablishment",
      },
      appliances_electronics: {
        schema: "http://schema.org/ElectronicsStore",
      },
      audio_visual: {
        schema: "http://schema.org/Store",
      },
      internet_software: {
        schema: "http://schema.org/SoftwareProduct",
      },
      computers_phones: {
        schema: "http://schema.org/ElectronicsStore",
      },
      repair_services: {
        schema: "http://schema.org/ProfessionalService",
      },
    },
  },
  events_entertainment: {
    code: "events_entertainment",
    schema: "http://schema.org/EventVenue",
    subs: {
      events_entertainment: { schema: "http://schema.org/FoodEstablishment" },
      clubbing_nightlife: {
        schema: "http://schema.org/NightClub",
      },
      adult_entertainment: {
        schema: "http://schema.org/EntertainmentBusiness",
      },
      childrens_entertainment: {
        schema: "http://schema.org/EntertainmentBusiness",
      },
      gaming: {
        schema: "http://schema.org/Game",
      },
      gambling: {
        schema: "http://schema.org/Casino",
      },
      events_venues: {
        schema: "http://schema.org/EventVenue",
      },
      wedding_party: {
        schema: "http://schema.org/Event",
      },
      museums_exibits: {
        schema: "http://schema.org/Museum",
      },
      music_movies: {
        schema: "http://schema.org/MusicVenue",
      },
      theater_opera: {
        schema: "http://schema.org/TheaterGroup",
      },
    },
  },
  hobbies_crafts: {
    code: "hobbies_crafts",
    schema: "http://schema.org/HobbyShop",
    subs: {
      hobbies_crafts: { schema: "http://schema.org/FoodEstablishment" },
      outdoor_activities: {
        schema: "http://schema.org/SportsActivityLocation",
      },
      art_handicraft: {
        schema: "http://schema.org/ArtGallery",
      },
      astrology_numerology: {
        schema: "http://schema.org/ProfessionalService",
      },
      fishing_hunting: {
        schema: "http://schema.org/SportsActivityLocation",
      },
      needlework_knitting: {
        schema: "http://schema.org/HobbyShop",
      },
      hobbies: {
        schema: "http://schema.org/HobbyShop",
      },
      music_instruments: {
        schema: "http://schema.org/MusicStore",
      },
      painting_paper: {
        schema: "http://schema.org/ArtGallery",
      },
      metal_stone_glass_work: {
        schema: "http://schema.org/ProfessionalService",
      },
    },
  },
  home_garden: {
    code: "home_garden",
    schema: "http://schema.org/HomeAndConstructionBusiness",
    subs: {
      home_garden: { schema: "http://schema.org/FoodEstablishment" },
      home_improvements: {
        schema: "http://schema.org/HomeAndConstructionBusiness",
      },
      decoration_interior: {
        schema: "http://schema.org/InteriorDesignBusiness",
      },
      energy_heating: {
        schema: "http://schema.org/ProfessionalService",
      },
      garden_pond: {
        schema: "http://schema.org/GardenStore",
      },
      home_goods_stores: {
        schema: "http://schema.org/FurnitureStore",
      },
      furniture_stores: {
        schema: "http://schema.org/FurnitureStore",
      },
      cultural_goods: {
        schema: "http://schema.org/BookStore",
      },
      bathroom_kitchen: {
        schema: "http://schema.org/HomeAndConstructionBusiness",
      },
      home_garden_services: {
        schema: "http://schema.org/HomeAndConstructionBusiness",
      },
      fabric_stationary: {
        schema: "http://schema.org/Store",
      },
    },
  },
  media_publishing: {
    code: "media_publishing",
    schema: "http://schema.org/NewsMediaOrganization",
    subs: {
      media_publishing: { schema: "http://schema.org/FoodEstablishment" },
      books_magazines: {
        schema: "http://schema.org/BookStore",
      },
      media_information: {
        schema: "http://schema.org/NewsMediaOrganization",
      },
      photography: {
        schema: "http://schema.org/Photograph",
      },
      video_sound: {
        schema: "http://schema.org/ProfessionalService",
      },
    },
  },
  restaurants_bars: {
    code: "restaurants_bars",
    schema: "http://schema.org/Restaurant",
    subs: {
      restaurants_bars: { schema: "http://schema.org/FoodEstablishment" },
      takeaway: {
        schema: "http://schema.org/FoodEstablishment",
      },
      bars_cafes: {
        schema: "http://schema.org/BarOrPub",
      },
      african_pacific_cuisine: {
        schema: "http://schema.org/Restaurant",
      },
      chinese_korean_cuisine: {
        schema: "http://schema.org/Restaurant",
      },
      north_south_american_cuisine: {
        schema: "http://schema.org/Restaurant",
      },
      southeast_asian_cuisine: {
        schema: "http://schema.org/Restaurant",
      },
      middle_eastern_cuisine: {
        schema: "http://schema.org/Restaurant",
      },
      european_cuisine: {
        schema: "http://schema.org/Restaurant",
      },
      japanese_cuisine: {
        schema: "http://schema.org/Restaurant",
      },
      mediterranean_cuisine: {
        schema: "http://schema.org/Restaurant",
      },
      general_restaurants: {
        schema: "http://schema.org/Restaurant",
      },
      vegetarian_diet: {
        schema: "http://schema.org/Restaurant",
      },
    },
  },
  health_medical: {
    code: "health_medical",
    schema: "http://schema.org/MedicalClinic",
    subs: {
      health_medical: { schema: "http://schema.org/FoodEstablishment" },
      physical_aids: {
        schema: "http://schema.org/MedicalDevice",
      },
      clinics: {
        schema: "http://schema.org/MedicalClinic",
      },
      diagnostics_testing: {
        schema: "http://schema.org/DiagnosticLab",
      },
      doctors_surgeons: {
        schema: "http://schema.org/Physician",
      },
      health_equipment: {
        schema: "http://schema.org/MedicalDevice",
      },
      hospital_emergency: {
        schema: "http://schema.org/Hospital",
      },
      pregnancy_children: {
        schema: "http://schema.org/Hospital",
      },
      medical_specialists: {
        schema: "http://schema.org/Physician",
      },
      pharmacy_medicine: {
        schema: "http://schema.org/Pharmacy",
      },
      mental_health: {
        schema: "http://schema.org/MedicalClinic",
      },
      dental_services: {
        schema: "http://schema.org/Dentist",
      },
      therapy_senior_health: {
        schema: "http://schema.org/ProfessionalService",
      },
      vision_hearing: {
        schema: "http://schema.org/ProfessionalService",
      },
    },
  },
  utilities: {
    code: "utilities",
    schema: "http://schema.org/Electrician",
    subs: {
      utilities: { schema: "http://schema.org/FoodEstablishment" },
      energy_power: {
        schema: "http://schema.org/Electrician",
      },
      oil_fuel: {
        schema: "http://schema.org/FuelStation",
      },
      water_utilities: {
        schema: "http://schema.org/ProfessionalService",
      },
    },
  },
  home_services: {
    code: "home_services",
    schema: "http://schema.org/HomeAndConstructionBusiness",
    subs: {
      home_services: { schema: "http://schema.org/FoodEstablishment" },
      craftsman: {
        schema: "http://schema.org/ProfessionalService",
      },
      moving_storage: {
        schema: "http://schema.org/ProfessionalService",
      },
      house_sitting_security: {
        schema: "http://schema.org/SecurityService",
      },
      plumbing_sanitation: {
        schema: "http://schema.org/ProfessionalService",
      },
      cleaning_service_providers: {
        schema: "http://schema.org/HomeAndConstructionBusiness",
      },
      repair_service_providers: {
        schema: "http://schema.org/HomeAndConstructionBusiness",
      },
      house_services: {
        schema: "http://schema.org/HomeAndConstructionBusiness",
      },
    },
  },
  business_services: {
    code: "business_services",
    schema: "http://schema.org/ProfessionalService",
    subs: {
      business_services: { schema: "http://schema.org/FoodEstablishment" },
      administration_services: {
        schema: "http://schema.org/ProfessionalService",
      },
      associations_centers: {
        schema: "http://schema.org/Organization",
      },
      wholesale: {
        schema: "http://schema.org/WholesaleStore",
      },
      import_export: {
        schema: "http://schema.org/ProfessionalService",
      },
      print_graphic_design: {
        schema: "http://schema.org/GraphicDesign",
      },
      research_development: {
        schema: "http://schema.org/ResearchProject",
      },
      it_communication: {
        schema: "http://schema.org/ITService",
      },
      office_space_supplies: {
        schema: "http://schema.org/OfficeEquipmentStore",
      },
      hr_recruiting: {
        schema: "http://schema.org/EmploymentAgency",
      },
      shipping_logistics: {
        schema: "http://schema.org/PostalAddress",
      },
      sales_marketing: {
        schema: "http://schema.org/ProfessionalService",
      },
    },
  },
  legal_services_government: {
    code: "legal_services_government",
    schema: "http://schema.org/Attorney",
    subs: {
      legal_services_government: {
        schema: "http://schema.org/FoodEstablishment",
      },
      lawyers_attorneys: {
        schema: "http://schema.org/Attorney",
      },
      libraries_archives: {
        schema: "http://schema.org/Library",
      },
      government_department: {
        schema: "http://schema.org/GovernmentOffice",
      },
      municipal_department: {
        schema: "http://schema.org/GovernmentOffice",
      },
      customs_toll: {
        schema: "http://schema.org/GovernmentOffice",
      },
      law_enforcement: {
        schema: "http://schema.org/PoliceStation",
      },
      legal_service_providers: {
        schema: "http://schema.org/Attorney",
      },
      registration_services: {
        schema: "http://schema.org/ProfessionalService",
      },
    },
  },
  public_local_services: {
    code: "public_local_services",
    schema: "http://schema.org/Organization",
    subs: {
      public_local_services: {
        schema: "http://schema.org/FoodEstablishment",
      },
      employment_career: {
        schema: "http://schema.org/EmploymentAgency",
      },
      kids_family: {
        schema: "http://schema.org/Organization",
      },
      funeral_memorial: {
        schema: "http://schema.org/FuneralHome",
      },
      waste_management: {
        schema: "http://schema.org/WasteManagement",
      },
      religious_institutions: {
        schema: "http://schema.org/PlaceOfWorship",
      },
      military_veteran: {
        schema: "http://schema.org/ProfessionalService",
      },
      nature_environment: {
        schema: "http://schema.org/Park",
      },
      professional_organizations: {
        schema: "http://schema.org/Organization",
      },
      shelters_homes: {
        schema: "http://schema.org/LocalBusiness",
      },
      public_services_welfare: {
        schema: "http://schema.org/LocalBusiness",
      },
      housing_associations: {
        schema: "http://schema.org/ProfessionalService",
      },
    },
  },
  shopping_fashion: {
    code: "shopping_fashion",
    schema: "http://schema.org/ClothingStore",
    subs: {
      shopping_fashion: { schema: "http://schema.org/FoodEstablishment" },
      accessories: {
        schema: "http://schema.org/Store",
      },
      jewelry_watches: {
        schema: "http://schema.org/JewelryStore",
      },
      malls_marketplaces: {
        schema: "http://schema.org/ShoppingCenter",
      },
      costume_wedding: {
        schema: "http://schema.org/ClothingStore",
      },
      clothing_rental_repair: {
        schema: "http://schema.org/ClothingStore",
      },
      clothing_underwear: {
        schema: "http://schema.org/ClothingStore",
      },
    },
  },
  sports: {
    code: "sports",
    schema: "http://schema.org/SportsActivityLocation",
    subs: {
      sports: { schema: "http://schema.org/FoodEstablishment" },
      martial_arts_wrestling: {
        schema: "http://schema.org/SportsActivityLocation",
      },
      dancing_gymnastics: {
        schema: "http://schema.org/SportsActivityLocation",
      },
      equipment_associations: {
        schema: "http://schema.org/Organization",
      },
      fitness_weight_lifting: {
        schema: "http://schema.org/FitnessCenter",
      },
      golf_ultimate: {
        schema: "http://schema.org/SportsActivityLocation",
      },
      hockey_ice_skating: {
        schema: "http://schema.org/SportsActivityLocation",
      },
      ball_games: {
        schema: "http://schema.org/SportsActivityLocation",
      },
      "bat-and-ball_games": {
        schema: "http://schema.org/SportsActivityLocation",
      },
      bowls_lawn_sports: {
        schema: "http://schema.org/SportsActivityLocation",
      },
      swimming_water_sports: {
        schema: "http://schema.org/SportsActivityLocation",
      },
      shooting_target_sports: {
        schema: "http://schema.org/SportsActivityLocation",
      },
      outdoor_winter_sports: {
        schema: "http://schema.org/SportsActivityLocation",
      },
      extreme_sports: {
        schema: "http://schema.org/SportsActivityLocation",
      },
      tennis_racquet_sports: {
        schema: "http://schema.org/SportsActivityLocation",
      },
    },
  },
  travel_vacation: {
    code: "travel_vacation",
    schema: "http://schema.org/TouristAttraction",
    subs: {
      travel_vacation: { schema: "http://schema.org/FoodEstablishment" },
      activities_tours: {
        schema: "http://schema.org/TouristAttraction",
      },
      travel_agencies: {
        schema: "http://schema.org/TravelAgency",
      },
      airlines_air_travel: {
        schema: "http://schema.org/Airline",
      },
      accomodations_lodging: {
        schema: "http://schema.org/LodgingBusiness",
      },
      hotels: {
        schema: "http://schema.org/Hotel",
      },
    },
  },
  vehicles_transportation: {
    code: "vehicles_transportation",
    schema: "http://schema.org/AutoDealer",
    subs: {
      vehicles_transportation: {
        schema: "http://schema.org/FoodEstablishment",
      },
      airports_parking: {
        schema: "http://schema.org/ParkingFacility",
      },
      other_vehicles_trailers: {
        schema: "http://schema.org/AutoDealer",
      },
      vehical_rental: {
        schema: "http://schema.org/CarRental",
      },
      motorcycle_powersports: {
        schema: "http://schema.org/Store",
      },
      auto_parts_wheels: {
        schema: "http://schema.org/Store",
      },
      vehicle_repair_fuel: {
        schema: "http://schema.org/AutoRepair",
      },
      taxis_public_transport: {
        schema: "http://schema.org/PublicTransport",
      },
      air_water_transport: {
        schema: "http://schema.org/TransportationService",
      },
      bicycles: {
        schema: "http://schema.org/BicycleStore",
      },
      cars_trucks: {
        schema: "http://schema.org/AutoDealer",
      },
    },
  },
};

export const schemaOrg = {
  getSchemaFromCode(code?: string | string[]) {
    if (!code) return;

    code = Array.isArray(code) ? (code.at(-1) as string) : code;
    return this.schemas[code as "agriculture_produce"];
  },

  schemas: {
    agriculture_produce: "http://schema.org/AgriculturalBusiness",
    beer_wine: "http://schema.org/Brewery",
    beverages_liquor: "http://schema.org/BeverageStore",
    candy_chocolate: "http://schema.org/FoodEstablishment",
    bakery_pastry: "http://schema.org/Bakery",
    coffee_tea: "http://schema.org/CafeOrCoffeeShop",
    lunch_catering: "http://schema.org/CateringBusiness",
    grocery_stores_markets: "http://schema.org/GroceryStore",
    asian_grocery_stores: "http://schema.org/GroceryStore",
    fruits_vegetables: "http://schema.org/FoodEstablishment",
    food_production: "http://schema.org/FoodProduction",
    smoking_tobacco: "http://schema.org/Store",
    meat_seafood_eggs: "http://schema.org/Butcher",
    pet_stores: "http://schema.org/PetStore",
    cats_dogs: "http://schema.org/AnimalShelter",
    horses_riding: "http://schema.org/SportsActivityLocation",
    animal_parks_zoo: "http://schema.org/Zoo",
    animal_health: "http://schema.org/VeterinaryCare",
    pet_services: "http://schema.org/PetCare",
    insurance: "http://schema.org/InsuranceAgency",
    banking_money: "http://schema.org/BankOrCreditUnion",
    accounting_tax: "http://schema.org/AccountingService",
    real_estate: "http://schema.org/RealEstateAgent",
    investments_wealth: "http://schema.org/InvestmentOrDeposit",
    credit_debt_services: "http://schema.org/FinancialService",
    wellness_spa: "http://schema.org/HealthAndBeautyBusiness",
    personal_care: "http://schema.org/BeautySalon",
    cosmetics_makeup: "http://schema.org/BeautySalon",
    salons_clinics: "http://schema.org/BeautySalon",
    hair_care_styling: "http://schema.org/HairSalon",
    tattoos_piercings: "http://schema.org/TattooParlor",
    yoga_meditation: "http://schema.org/HealthAndBeautyBusiness",
    architects_engineers: "http://schema.org/ProfessionalService",
    contractors_consultants: "http://schema.org/ProfessionalService",
    factory_equipment: "http://schema.org/ProfessionalService",
    manufacturing: "http://schema.org/ManufacturingBusiness",
    industrial_supplies: "http://schema.org/Store",
    garden_landscaping: "http://schema.org/GardenStore",
    building_materials: "http://schema.org/HardwareStore",
    tools_equipment: "http://schema.org/HardwareStore",
    chemicals_plastic: "http://schema.org/Business",
    construction_services: "http://schema.org/HomeAndConstructionBusiness",
    production_services: "http://schema.org/Business",
    language_learning: "http://schema.org/EducationalOrganization",
    colleges_universities: "http://schema.org/CollegeOrUniversity",
    music_theater_classes: "http://schema.org/MusicGroup",
    school_high_school: "http://schema.org/HighSchool",
    specials_schools: "http://schema.org/EducationalOrganization",
    vocational_training: "http://schema.org/EducationalOrganization",
    courses_classes: "http://schema.org/Course",
    education_services: "http://schema.org/EducationalOrganization",
    appliances_electronics: "http://schema.org/ElectronicsStore",
    audio_visual: "http://schema.org/Store",
    internet_software: "http://schema.org/SoftwareProduct",
    computers_phones: "http://schema.org/ElectronicsStore",
    repair_services: "http://schema.org/ProfessionalService",
    clubbing_nightlife: "http://schema.org/NightClub",
    adult_entertainment: "http://schema.org/EntertainmentBusiness",
    childrens_entertainment: "http://schema.org/EntertainmentBusiness",
    gaming: "http://schema.org/Game",
    gambling: "http://schema.org/Casino",
    events_venues: "http://schema.org/EventVenue",
    wedding_party: "http://schema.org/Event",
    museums_exibits: "http://schema.org/Museum",
    music_movies: "http://schema.org/MusicVenue",
    theater_opera: "http://schema.org/TheaterGroup",
    outdoor_activities: "http://schema.org/SportsActivityLocation",
    art_handicraft: "http://schema.org/ArtGallery",
    astrology_numerology: "http://schema.org/ProfessionalService",
    fishing_hunting: "http://schema.org/SportsActivityLocation",
    needlework_knitting: "http://schema.org/HobbyShop",
    hobbies: "http://schema.org/HobbyShop",
    music_instruments: "http://schema.org/MusicStore",
    painting_paper: "http://schema.org/ArtGallery",
    metal_stone_glass_work: "http://schema.org/ProfessionalService",
    home_improvements: "http://schema.org/HomeAndConstructionBusiness",
    decoration_interior: "http://schema.org/InteriorDesignBusiness",
    energy_heating: "http://schema.org/ProfessionalService",
    garden_pond: "http://schema.org/GardenStore",
    home_goods_stores: "http://schema.org/FurnitureStore",
    furniture_stores: "http://schema.org/FurnitureStore",
    cultural_goods: "http://schema.org/BookStore",
    bathroom_kitchen: "http://schema.org/HomeAndConstructionBusiness",
    home_garden_services: "http://schema.org/HomeAndConstructionBusiness",
    fabric_stationary: "http://schema.org/Store",
    books_magazines: "http://schema.org/BookStore",
    media_information: "http://schema.org/NewsMediaOrganization",
    photography: "http://schema.org/Photograph",
    video_sound: "http://schema.org/ProfessionalService",
    takeaway: "http://schema.org/FoodEstablishment",
    bars_cafes: "http://schema.org/BarOrPub",
    african_pacific_cuisine: "http://schema.org/Restaurant",
    chinese_korean_cuisine: "http://schema.org/Restaurant",
    north_south_american_cuisine: "http://schema.org/Restaurant",
    southeast_asian_cuisine: "http://schema.org/Restaurant",
    middle_eastern_cuisine: "http://schema.org/Restaurant",
    european_cuisine: "http://schema.org/Restaurant",
    japanese_cuisine: "http://schema.org/Restaurant",
    mediterranean_cuisine: "http://schema.org/Restaurant",
    general_restaurants: "http://schema.org/Restaurant",
    vegetarian_diet: "http://schema.org/Restaurant",
    physical_aids: "http://schema.org/MedicalDevice",
    clinics: "http://schema.org/MedicalClinic",
    diagnostics_testing: "http://schema.org/DiagnosticLab",
    doctors_surgeons: "http://schema.org/Physician",
    health_equipment: "http://schema.org/MedicalDevice",
    hospital_emergency: "http://schema.org/Hospital",
    pregnancy_children: "http://schema.org/Hospital",
    medical_specialists: "http://schema.org/Physician",
    pharmacy_medicine: "http://schema.org/Pharmacy",
    mental_health: "http://schema.org/MedicalClinic",
    dental_services: "http://schema.org/Dentist",
    therapy_senior_health: "http://schema.org/ProfessionalService",
    vision_hearing: "http://schema.org/ProfessionalService",
    energy_power: "http://schema.org/Electrician",
    oil_fuel: "http://schema.org/FuelStation",
    water_utilities: "http://schema.org/ProfessionalService",
    craftsman: "http://schema.org/ProfessionalService",
    moving_storage: "http://schema.org/ProfessionalService",
    house_sitting_security: "http://schema.org/SecurityService",
    plumbing_sanitation: "http://schema.org/ProfessionalService",
    cleaning_service_providers: "http://schema.org/HomeAndConstructionBusiness",
    repair_service_providers: "http://schema.org/HomeAndConstructionBusiness",
    house_services: "http://schema.org/HomeAndConstructionBusiness",
    administration_services: "http://schema.org/ProfessionalService",
    associations_centers: "http://schema.org/Organization",
    wholesale: "http://schema.org/WholesaleStore",
    import_export: "http://schema.org/ProfessionalService",
    print_graphic_design: "http://schema.org/GraphicDesign",
    research_development: "http://schema.org/ResearchProject",
    it_communication: "http://schema.org/ITService",
    office_space_supplies: "http://schema.org/OfficeEquipmentStore",
    hr_recruiting: "http://schema.org/EmploymentAgency",
    shipping_logistics: "http://schema.org/PostalAddress",
    sales_marketing: "http://schema.org/ProfessionalService",
    lawyers_attorneys: "http://schema.org/Attorney",
    libraries_archives: "http://schema.org/Library",
    government_department: "http://schema.org/GovernmentOffice",
    municipal_department: "http://schema.org/GovernmentOffice",
    customs_toll: "http://schema.org/GovernmentOffice",
    law_enforcement: "http://schema.org/PoliceStation",
    legal_service_providers: "http://schema.org/Attorney",
    registration_services: "http://schema.org/ProfessionalService",
    employment_career: "http://schema.org/EmploymentAgency",
    kids_family: "http://schema.org/Organization",
    funeral_memorial: "http://schema.org/FuneralHome",
    waste_management: "http://schema.org/WasteManagement",
    religious_institutions: "http://schema.org/PlaceOfWorship",
    military_veteran: "http://schema.org/ProfessionalService",
    nature_environment: "http://schema.org/Park",
    professional_organizations: "http://schema.org/Organization",
    shelters_homes: "http://schema.org/LocalBusiness",
    public_services_welfare: "http://schema.org/LocalBusiness",
    housing_associations: "http://schema.org/ProfessionalService",
    accessories: "http://schema.org/Store",
    jewelry_watches: "http://schema.org/JewelryStore",
    malls_marketplaces: "http://schema.org/ShoppingCenter",
    costume_wedding: "http://schema.org/ClothingStore",
    clothing_rental_repair: "http://schema.org/ClothingStore",
    clothing_underwear: "http://schema.org/ClothingStore",
    martial_arts_wrestling: "http://schema.org/SportsActivityLocation",
    dancing_gymnastics: "http://schema.org/SportsActivityLocation",
    equipment_associations: "http://schema.org/Organization",
    fitness_weight_lifting: "http://schema.org/FitnessCenter",
    golf_ultimate: "http://schema.org/SportsActivityLocation",
    hockey_ice_skating: "http://schema.org/SportsActivityLocation",
    ball_games: "http://schema.org/SportsActivityLocation",
    "bat-and-ball_games": "http://schema.org/SportsActivityLocation",
    bowls_lawn_sports: "http://schema.org/SportsActivityLocation",
    swimming_water_sports: "http://schema.org/SportsActivityLocation",
    shooting_target_sports: "http://schema.org/SportsActivityLocation",
    outdoor_winter_sports: "http://schema.org/SportsActivityLocation",
    extreme_sports: "http://schema.org/SportsActivityLocation",
    tennis_racquet_sports: "http://schema.org/SportsActivityLocation",
    activities_tours: "http://schema.org/TouristAttraction",
    travel_agencies: "http://schema.org/TravelAgency",
    airlines_air_travel: "http://schema.org/Airline",
    accomodations_lodging: "http://schema.org/LodgingBusiness",
    hotels: "http://schema.org/Hotel",
    airports_parking: "http://schema.org/ParkingFacility",
    other_vehicles_trailers: "http://schema.org/AutoDealer",
    vehical_rental: "http://schema.org/CarRental",
    motorcycle_powersports: "http://schema.org/Store",
    auto_parts_wheels: "http://schema.org/Store",
    vehicle_repair_fuel: "http://schema.org/AutoRepair",
    taxis_public_transport: "http://schema.org/PublicTransport",
    air_water_transport: "http://schema.org/TransportationService",
    bicycles: "http://schema.org/BicycleStore",
    cars_trucks: "http://schema.org/AutoDealer",
  },

  groups,
};
