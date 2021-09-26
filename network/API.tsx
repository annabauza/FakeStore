export interface Product {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: {
        count: number;
        rate: number;
    };
    title: string;
}

export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    };
}

export type Cart = {
    id: number;
    userId: number;
    date: string;
    products: CartProduct[];
};

export type CartProduct = {
    productId: number;
    quantity: number;
};

export const loginUser = (
    username: string,
    password: string,
    success: (token: string) => void,
    fail?: (error: Error) => void,
) => {
    const controller = new AbortController();
    const { signal } = controller;
    fetch('https://fakestoreapi.com/auth/login', {
        signal,
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then(res => {
            if (res.status === 200 && res.ok) {
                return res.json();
            } else {
                throw new Error(
                    'Could not login. Please correct credentials or try again later.',
                );
            }
        })
        .then(json => {
            if (json.status === 'Error') {
                throw new Error(json.msg);
            } else {
                success(json.token);
            }
        })
        .catch(error => {
            fail ? fail(error) : console.error(error);
        });
    return controller;
};

export const getCategories = (
    success: (array: Array<string>) => void,
    fail?: (error: Error) => void,
) => {
    const controller = new AbortController();
    const { signal } = controller;
    fetch('https://fakestoreapi.com/products/categories', {
        signal,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => {
            if (res.status === 200 && res.ok) {
                return res.json();
            } else {
                throw new Error('Could not fetch categories. Try again later.');
            }
        })
        .then(json => {
            success(json);
        })
        .catch(error => {
            fail ? fail(error) : console.error(error);
        });
    return controller;
};

export const getProduct = (
    productId: number,
    success: (product: Product) => void,
    fail?: (error: Error) => void,
) => {
    const controller = new AbortController();
    const { signal } = controller;
    fetch(`https://fakestoreapi.com/products/${productId}`, {
        signal,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => {
            if (res.status === 200 && res.ok) {
                return res.json();
            } else {
                throw new Error('Could not fetch product. Try again later.');
            }
        })
        .then(json => {
            success(json);
        })
        .catch(error => {
            fail ? fail(error) : console.error(error);
        });
    return controller;
};

export const getAllProducts = (
    success: (products: Array<Product>) => void,
    fail?: (error: Error) => void,
) => {
    const controller = new AbortController();
    const { signal } = controller;
    fetch('https://fakestoreapi.com/products', {
        signal,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => {
            if (res.status === 200 && res.ok) {
                return res.json();
            } else {
                throw new Error('Could not fetch products. Try again later.');
            }
        })
        .then(json => {
            success(json);
        })
        .catch(error => {
            fail ? fail(error) : console.error(error);
        });

    return controller;
};

export const getProductsForCategory = (
    categoryId: number,
    success: (products: Array<Product>) => void,
    fail?: (error: Error) => void,
) => {
    const controller = new AbortController();
    const { signal } = controller;
    fetch(`https://fakestoreapi.com/products/category/${categoryId}`, {
        signal,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => {
            if (res.status === 200 && res.ok) {
                return res.json();
            } else {
                throw new Error('Could not fetch products. Try again later.');
            }
        })
        .then(json => {
            success(json);
        })
        .catch(error => {
            fail ? fail(error) : console.error(error);
        });

    return controller;
};

export const getAllUsers = (
    success: (users: Array<User>) => void,
    fail?: (error: Error) => void,
) => {
    const controller = new AbortController();
    const { signal } = controller;
    fetch('https://fakestoreapi.com/users', {
        signal,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => {
            if (res.status === 200 && res.ok) {
                return res.json();
            } else {
                throw new Error('Could not fetch all users. Try again later.');
            }
        })
        .then(json => {
            success(json);
        })
        .catch(error => {
            fail ? fail(error) : console.error(error);
        });

    return controller;
};

export const getUerCart = (
    userId: number,
    success: (cart: Cart) => void,
    fail?: (error: Error) => void,
) => {
    const controller = new AbortController();
    const { signal } = controller;
    fetch(`https://fakestoreapi.com/carts/user/${userId}`, {
        signal,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => {
            if (res.status === 200 && res.ok) {
                return res.json();
            } else {
                throw new Error('Could not fetch cart. Try again later.');
            }
        })
        .then(json => {
            success(json[0]);
        })
        .catch(error => {
            fail ? fail(error) : console.error(error);
        });
    return controller;
};
