const dishes = [
    // Супы (6 блюд) 
    {
        keyword: "gaspacho",
        name: "Гаспачо",
        price: 195,
        category: "soup",
        count: "350 г",
        image: "images/menu/soup1.jpg", 
        kind: "veg"
    },
    {
        keyword: "mushroom_cream_soup",
        name: "Грибной суп-пюре",
        price: 185,
        category: "soup",
        count: "330 г",
        image: "images/menu/soup2.jpg", 
        kind: "veg"
    },
    {
        keyword: "norwegian_soup",
        name: "Норвежский суп",
        price: 270,
        category: "soup",
        count: "330 г",
        image: "images/menu/soup3.jpg", 
        kind: "fish"
    },
    {
        keyword: "ramen",
        name: "Рамен",
        price: 375,
        category: "soup",
        count: "425 г",
        image: "images/menu/gaspacho.jpg", 
        kind: "meat"
    },
    {
        keyword: "tom_yam",
        name: "Том ям с креветками",
        price: 650,
        category: "soup",
        count: "500 г",
        image: "images/menu/tom_yam.jpg", 
        kind: "fish"
    },
    {
        keyword: "chicken_soup",
        name: "Куриный суп",
        price: 330,
        category: "soup",
        count: "350 г",
        image: "images/menu/chicken_soup.jpg", 
        kind: "meat"
    },

    // Главные блюда 
    {
        keyword: "fried_potatoes_mushrooms",
        name: "Жареная картошка с грибами",
        price: 150,
        category: "main",
        count: "250 г",
        image: "images/menu/main1.jpg",
        kind: "veg"
    },
    {
        keyword: "lasagna",
        name: "Лазанья",
        price: 325,
        category: "main",
        count: "310 г",
        image: "images/menu/lasagna.jpg", 
        kind: "meat"
    },
    {
        keyword: "chicken_cutlets_puree",
        name: "Котлеты из курицы с картофельным пюре",
        price: 225,
        category: "main",
        count: "280 г",
        image: "images/menu/chicken_cutlets.jpg", 
        kind: "meat"
    },
    {
        keyword: "fish_cutlet_rice",
        name: "Рыбная котлета с рисом и спаржей",
        price: 320,
        category: "main",
        count: "270 г",
        image: "images/menu/fish_cutlet.jpg", 
        kind: "fish"
    },
    {
        keyword: "pizza_margarita",
        name: "Пицца Маргарита",
        price: 450,
        category: "main",
        count: "470 г",
        image: "images/menu/pizza_margaria.jpg", 
    },
    {
        keyword: "pasta_shrimp",
        name: "Паста с креветками",
        price: 340,
        category: "main",
        count: "280 г",
        image: "images/menu/pasta_shrimp.jpg", 
        kind: "fish"
    },

    // Салаты и стартеры
    {
        keyword: "korean_salad",
        name: "Корейский салат с овощами и яйцом",
        price: 330,
        category: "salad",
        count: "250 г",
        image: "images/menu/korean_salad.jpg",
        kind: "veg"
    },
    {
        keyword: "tuna_salad",
        name: "Салат с тунцом",
        price: 480,
        category: "salad",
        count: "250 г",
        image: "images/menu/caesar_chicken.jpg", 
        kind: "fish"
    },
    {
        keyword: "caesar_chicken",
        name: "Цезарь с цыпленком",
        price: 370,
        category: "salad",
        count: "220 г",
        image: "images/menu/caesar_chicken.jpg",
        kind: "meat"
    },
    {
        keyword: "fries_caesar",
        name: "Картофель фри с соусом Цезарь",
        price: 280,
        category: "salad",
        count: "235 г",
        image: "images/menu/fries_caesar.jpg",
        kind: "veg"
    },
    {
        keyword: "caprese",
        name: "Капрезе с моцареллой",
        price: 350,
        category: "salad",
        count: "235 г",
        image: "images/menu/caprese.jpg",
        kind: "veg"
    },
    {
        keyword: "fries_ketchup",
        name: "Картофель фри с кетчупом",
        price: 260,
        category: "salad",
        count: "235 г",
        image: "images/menu/fries_ketchup.jpg",
        kind: "veg"
    },

    // Напитки
    {
        keyword: "orange_juice",
        name: "Апельсиновый сок",
        price: 120,
        category: "drink",
        count: "300 мл",
        image: "images/menu/drink1.jpg", 
        kind: "cold"
    },
    {
        keyword: "apple_juice",
        name: "Яблочный сок",
        price: 90,
        category: "drink",
        count: "300 мл",
        image: "images/menu/drink2.jpg", 
        kind: "cold"
    },
    {
        keyword: "carrot_juice",
        name: "Морковный сок",
        price: 110,
        category: "drink",
        count: "300 мл",
        image: "images/menu/drink3.jpg", 
        kind: "cold"
    },
    {
        keyword: "cappuccino",
        name: "Капучино",
        price: 180,
        category: "drink",
        count: "300 мл",
        image: "images/menu/cappuccino.jpg", 
        kind: "hot"
    },
    {
        keyword: "green_tea",
        name: "Зеленый чай",
        price: 100,
        category: "drink",
        count: "300 мл",
        image: "images/menu/green_tea.jpg", 
        kind: "hot"
    },
    {
        keyword: "black_tea",
        name: "Черный чай",
        price: 90,
        category: "drink",
        count: "300 мл",
        image: "images/menu/black_tea.jpg", 
        kind: "hot"
    },

    // Десерты 
    {
        keyword: "baklava",
        name: "Пахлава",
        price: 220,
        category: "dessert",
        count: "300 г",
        image: "images/menu/baklava.jpg",
        kind: "small"
    },
    {
        keyword: "cheesecake",
        name: "Чизкейк",
        price: 240,
        category: "dessert",
        count: "125 г",
        image: "images/menu/cheesecake.jpg",
        kind: "small"
    },
    {
        keyword: "chocolate_cheesecake",
        name: "Шоколадный чизкейк",
        price: 260,
        category: "dessert",
        count: "125 г",
        image: "images/menu/chocolate_cheesecake.jpg",
        kind: "small"
    },
    {
        keyword: "chocolate_cake",
        name: "Шоколадный торт",
        price: 270,
        category: "dessert",
        count: "140 г",
        image: "images/menu/chocolate_cake.jpg",
        kind: "medium"
    },
    {
        keyword: "donuts_3",
        name: "Пончики (3 штуки)",
        price: 410,
        category: "dessert",
        count: "350 г",
        image: "images/menu/donuts_3.jpg",
        kind: "medium"
    },
    {
        keyword: "donuts_6",
        name: "Пончики (6 штуки)",
        price: 650,
        category: "dessert",
        count: "700 г",
        image: "images/menu/donuts_6.jpg",
        kind: "large"
    }
];