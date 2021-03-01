const skipButton = document.getElementById("skipChallenge");
const currTopicText = document.getElementById("currTopic");
const currCourseText = document.getElementById("currCourse");
const currExerciseText = document.getElementById("currExercise");
const nextExerciseText = document.getElementById("nextExercise");

skipButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function (response) {
            // do whatever with response
            const url = response.url.split("/");
            currTopicText.textContent = url[url.length - 1];
            currCourseText.textContent = url[url.length - 2];
            currExerciseText.textContent = url[url.length - 3];
        });
    });
});
