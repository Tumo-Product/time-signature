const pluginAPI = {
    initialize  : async () => {
        postMessage("init");

        let answer;

        await new Promise((resolve) => {
            window.addEventListener("message", async (event) => {
                if (event.data.application !== "activity-manager") {
                    resolve();
                    return;
                }

                const { data } = event.data;

                if (!data) {
                    resolve();
                    return;
                }

                if (data.answers) {
                    answer = data.answers[0];
                    resolve();
                    return;
                }

                resolve();
            });
        });

        return answer;
    },
    setHeight   : async (height) => {
        postMessage("set-iframe-height", { iframeHeight: height });
    },
    setAnswers  : (outcome) => {
        postMessage("set-answers", { answers: [outcome] });
    },
    examine     : (status) => {
        postMessage("auto-examine", { status: status });
    }
}

const postMessage = (message, data) => {
    window.parent.postMessage({
        application : 'activity-manager',
        message     : message,
        data        : data
    }, '*');
}

export default pluginAPI;