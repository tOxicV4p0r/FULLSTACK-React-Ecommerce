// export const baseURL = "http://localhost:3001";
export const baseURL = "https://serverstrapi-nhvl2sce2q-as.a.run.app";

export const postOrder = async (data) => {
    const res = await fetch(`${baseURL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    return await res.json();
}

export const fetchItem = async (data) => {
    const res = await fetch(`${baseURL}/api/items/${data}?populate=image`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    return await res.json();
}

export const fetchItems = async () => {
    const res = await fetch(`${baseURL}/api/items?populate=image`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    return await res.json();
}