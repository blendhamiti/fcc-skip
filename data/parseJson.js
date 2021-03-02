var fs = require('fs');

function parseJson(data) {
    const topics = data.data.allChallengeNode.nodes
        .map(el => el = {
            "title": el.superBlock,
            "courses": []
        });
    // console.log(topics);

    const urls = data.data.allChallengeNode.edges
        .map(element => element.node.fields.slug);
    // console.log(urls);

    // const courses = [];
    // urls.forEach(url => {
    //     let courseExists = false;
    //     courses.forEach(course => {
    //         if (course.title === url.split("/")[3])
    //             courseExists = true;
    //     });
    //     if (courseExists)
    //         courses.forEach(course => {
    //             if (course.title === url.split("/")[3])
    //                 course.challenges.push(url.split("/")[4])
    //         });
    //     else
    //         courses.push({
    //             "title": url.split("/")[3],
    //             "challenges": [url.split("/")[4]]
    //         });
    // })
    // console.log(courses);

    topics.forEach(topic => {
        let courses = [];
        urls.forEach(url => {
            if (topic.title === url.split("/")[2]) {
                let courseExists = false;
                courses.forEach(course => {
                    if (course.title === url.split("/")[3])
                        courseExists = true;
                });
                if (courseExists)
                    courses.forEach(course => {
                        if (course.title === url.split("/")[3])
                            course.challenges.push(url.split("/")[4])
                    });
                else
                    courses.push({
                        "title": url.split("/")[3],
                        "challenges": [url.split("/")[4]]
                    });
            }
        })
        topic.courses = courses;
    })
    // console.log(topics);
    // topics.forEach(topic => {
    //     topic.courses.forEach(course => {
    //         course.challenges.forEach(challenge => {
    //             console.log(topic.title + "---" + course.title + "---" + challenge);
    //         })
    //     })
    // })

    return topics;
}

fs.readFile('./data/fcc-original.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
        console.log(err);
    }
    else {
        unstructuredData = JSON.parse(data);
        structuredData = JSON.stringify(parseJson(unstructuredData));
        fs.writeFile('./data/fcc-structured.json', structuredData, 'utf8', function writeFileCallback(err) {
            if (err) {
                console.log(err);
            }
        });
    }
});
