$(document).ready(function () {
    $("#getState").click(function () {
        let city1 = $("#city-1").val();
        let city2 = $("#city-2").val();
        let city3 = $("#city-3").val();
        let city4 = $("#city-4").val();
        let city5 = $("#city-5").val();
        let cityArray = [city1, city2, city3, city4, city5]
        let stateArr = [];

        for (let city of cityArray) {
            $.ajax({
                url: `state/${city}`,
                datatype: 'json',
                success: function (result) {
                    stateArr.push(result);
                }
            })
        }

        findMostFreq(stateArr);

    })


    function findMostFreq(arr) {
        setTimeout(
            function () {
                let counts = {};
                let compare = -1;
                let keys = [];
                let mostFrequent;
                for (let i = 0, len = arr.length; i < len; i++) {
                    let word = arr[i];

                    if(counts[word] === undefined) {
                        counts[word] = 1;
                    } else {
                        counts[word]++;
                    }
                    if(counts[word] > compare) {
                        compare = counts[word];
                        mostFrequent = arr[i]
                    }
                }
                $("#result").text(mostFrequent)
                console.log(mostFrequent);
            }, 2000
        )
    }
})



