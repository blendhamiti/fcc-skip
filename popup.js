const runScriptButton = document.getElementById("runScript");
const currTopicText = document.getElementById("currTopic");
const currCourseText = document.getElementById("currCourse");
const currChallengeText = document.getElementById("currChallenge");
const nextChallengeText = document.getElementById("nextChallenge");
const nextChallengeLink = document.getElementById("nextChallengeLink");

runScriptButton.addEventListener("click", () => {

    // send a request to contentScript
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function (response) {

            // receive current tab url as a response message from contentScript
            const url = response.url.split("/");

            // get the popup text fields from url info
            currTopicText.textContent = url[url.length - 3];
            currCourseText.textContent = url[url.length - 2];
            currChallengeText.textContent = url[url.length - 1];

            // get the json file with the freecodecamp course information
            $.ajax({
                method: "GET",
                url: "data/fcc-structured.json",
            }).done(response => {
                // the response is a json object
                // nextChallenge variable holds the challenge name
                let nextChallenge = getNextChallenge(response, url);

                // if a next challenge exists
                if (nextChallenge) {

                    // prepare the url for the next challenge
                    nextChallengeUrl = [...url];
                    nextChallengeUrl[nextChallengeUrl.length - 1] = nextChallenge;

                    // create an 'a' element to display the link of the next challenge
                    let link = document.createElement('a');
                    link.appendChild(document.createTextNode(nextChallengeUrl.join("/")))
                    link.href = nextChallengeUrl.join("/");

                    // add the url and name of the next challenge to popup 
                    nextChallengeText.textContent = nextChallenge;
                    nextChallengeLink.appendChild(link);
                }

                // if a next challenge is not found
                else {
                    nextChallengeText.textContent = "Not found";
                }
            })

        });
    });
});

function getNextChallenge(data, url) {
    let nextChallenge;

    // get indexes of current topic, course, challenge
    const topicIndex = data.findIndex((topic) => topic.title === url[url.length - 3]);
    if (topicIndex < 0) return null;
    const courseIndex = data[topicIndex].courses.findIndex((course) => course.title === url[url.length - 2]);
    if (courseIndex < 0) return null;
    const challengeIndex = data[topicIndex].courses[courseIndex].challenges.findIndex((challenge) => challenge === url[url.length - 1]);
    if (challengeIndex < 0) return null;

    // if current challenge is the last challenge on the list, return the first challenge
    if (challengeIndex == data[topicIndex].courses[courseIndex].challenges.length - 1)
        nextChallenge = data[topicIndex].courses[courseIndex].challenges[0];
    else
        nextChallenge = data[topicIndex].courses[courseIndex].challenges[challengeIndex + 1];

    return (nextChallenge) ? nextChallenge : null;
}
