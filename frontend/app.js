// document.addEventListener("DOMContentLoaded", () => {

//     const input = document.getElementById("input");
//     const result = document.getElementById("result");

//     window.append = (value) => {
//         input.value += value;
//         console.log("append:", value);
//     };

//     window.clearDisplay = () => {
//         input.value = "";
//         result.innerText = "";
//         console.log("cleared");
//     };

//     window.calculate = () => {
//         let expression = input.value;

//         console.log("expression:", expression);

//         if (!expression) {
//             result.innerText = "Enter value first";
//             return;
//         }

//         fetch("http://localhost:5000/calculator", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ expression })
//         })
//             .then(res => res.json())
//             .then(data => {
//                 console.log("response:", data);

//                 if (data.result !== undefined) {
//                     input.value = data.result;
//                 } else {
//                     result.innerText = data.err;
//                 }
//             })
//             .catch(err => {
//                 console.log("fetch error:", err);
//                 result.innerText = "Server Error";
//             });
//     };

// });
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("input");
    const result = document.getElementById("result");

    // ✅ Yeh line add ki hai
    const API_URL = window.location.origin;

    window.append = (value) => {
        input.value += value;
        console.log("append:", value);
    };

    window.clearDisplay = () => {
        input.value = "";
        result.innerText = "";
        console.log("cleared");
    };

    window.calculate = () => {
        let expression = input.value;

        console.log("expression:", expression);

        if (!expression) {
            result.innerText = "Enter value first";
            return;
        }

        fetch(`${API_URL}/calculator`, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ expression })
        })
            .then(res => res.json())
            .then(data => {
                console.log("response:", data);

                if (data.result !== undefined) {
                    input.value = data.result;
                } else {
                    result.innerText = data.err;
                }
            })
            .catch(err => {
                console.log("fetch error:", err);
                result.innerText = "Server Error";
            });
    };

});