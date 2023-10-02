// 1. Import the required modules
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

// 2. Define the GraphQL schema
const typeDefs = gql`
  type MenuItem {
    name: String
    description: String
    price: Float
  }

  type Query {
    getAppetizers: [MenuItem]
    getEntrees: [MenuItem]
    getSandwiches: [MenuItem]
    getSoupAndSaladCombos: [MenuItem]
    getFajitas: [MenuItem]
    getTacos: [MenuItem]
    getEnchiladas: [MenuItem]
    getQuiche: [MenuItem]
    getGreenSalads: [MenuItem]
  }
`;

// 3. Define the menu data
const menuData = {
    appetizers: [
        {
            name: "Iceberg Wedge Salad with House Cured Bacon",
            description: "tomato salsa gorgonzola",
            price: 7.50
        },
        // Add more appetizers here...
    ],
    entrees: [
        {
            name: "Farfalle Pasta with Braised Pork in Tomato Cream",
            description: "capers butternut squash kale",
            price: 12.95
        },
        // Add more entrees here...
    ],
    sandwiches: [
        {
            name: "Turkey & Avocado",
            description: "with tomato",
            price: 9.25
        },
        // Add more sandwiches here...
    ],
    soupAndSaladCombos: [
        {
            name: 'French Onion',
            description: "French Onion or Soup of the Day",
            price: 4.95
        },
        {
            name: 'French Onion or Soup of the Day Combos',
            description: "French Onion or Soup of the Day Combos",
            price: 7.25
        }
    ],
    fajitas: [
        {
            name: "Served with red rice",
            description: 'Served with red rice, black beans, grilled tomato salad, choice of corn or flour tortillas',
            price: 10.95
        }
    ],
    tacos: [
        {
            name: 'Served with red rice',
            description: 'Served with red rice, black beans, corn & romaine salad, tortilla chips',
            price: 9.95
        }
    ],
    enchiladas: [
        {
            name: "with Southwestern Succotash, Black Beans with Chipotle Crema",
            description: 'Choice of Beef, Chicken, Cheese or Veggie',
            price: 8.50
        }
    ],
    quiche: [
        {
            name: "Bacon, Swiss, Mushroom, Zucchini and Mushroom Quiche Choice of Fresh Fruit or Green Salad",
            description: 'Bacon, Swiss, Mushroom, Zucchini and Mushroom Quiche Choice of Fresh Fruit or Green Salad',
            price: 8.95
        }
    ],
    greenSalads: [
        {
            name: "Grilled Red Trout Lentils",
            description: 'Grilled Red Trout Lentils, Tomatoes, Cukes, Green Beans, Red Bells, Almonds, Sundried Tomato',
            price: 10.95
        },
        {
            name: "Smoked Turkey Cheese",
            description: 'Smoked Turkey Cheese Tortellini, Bacon, Tomato, Cucumber, Egg, Black Bean-Corn Salsa, Avocado',
            price: 9.95
        },
        {
            name: "Asian Grilled Chicken",
            description: 'Asian Grilled Chicken Snow Peas, Carrot Slaw, Red Bells, Water Chestnut, Peanuts, Baby Corn, Cilantro, Cukes, Spicy Peanut Dressing',
            price: 10.50
        },
        {
            name: "Southwest Grilled Chicken",
            description: 'Southwest Grilled Chicken Tomato, Guacamole, pepitas, Jicama, Corn & Black Bean Salsa, Orange Wedges, Spicy Citrus Vinaigrette',
            price: 10.50
        },
        {
            name: "Kalamatas",
            description: 'Mediterranean Italian Sausage, Artichoke Hearts, Green Beans, Roma Tomato, Kalamatas, Red Onion, Cucumber, Croutons, Parmesan, Fresh Mozzarella, Gorgonzola Vinaigrette',
            price: 9.95
        },
        {
            name: "Grilled Salmon",
            description: 'Grilled Salmon Artichoke tapenade, shredded kale, corn, radish, parmesan crisps',
            price: 11.50
        },
        // Add more green salads here...
    ],
};

// 4. Define the resolvers
const resolvers = {
    Query: {
        getAppetizers: () => menuData.appetizers,
        getEntrees: () => menuData.entrees,
        getSandwiches: () => menuData.sandwiches,
        getSoupAndSaladCombos: () => menuData.soupAndSaladCombos,
        getFajitas: () => menuData.fajitas,
        getTacos: () => menuData.tacos,
        getEnchiladas: () => menuData.enchiladas,
        getQuiche: () => menuData.quiche,
        getGreenSalads: () => menuData.greenSalads,
    },
};

const app = express();

const startApolloServer = async () => {
    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    const PORT = 3000;
    const httpServer = app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });

    return { server: httpServer, app };
};

module.exports = { startApolloServer };