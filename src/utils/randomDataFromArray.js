export default function randomiseArray(data, key = "id") {
    // const data = [{ "id": 1,"title": "Car", "image": "car.png"} ];
    const randomId = Math.floor(Math.random() * data.length);
    const randomArray = data.filter((element) => {
        if (element.id !== randomId) {
            return element;
        }
        return null;
    });
    return randomArray;
}

