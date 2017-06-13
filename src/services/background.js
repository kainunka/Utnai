import BackgroundJob from 'react-native-background-job';

const JOB_MESSAGE_CHECK = "message";

// register background task
export const register = () => {
  BackgroundJob.register({
    jobKey: JOB_MESSAGE_CHECK,
    job: () => {
      console.log("OK");
    }
  })
}

export const schedule = () => {

    BackgroundJob.schedule({
        jobKey: JOB_MESSAGE_CHECK,
        period: 5000,
        timeout: 5000,
        networkType: BackgroundJob.NETWORK_TYPE_UNMETERED
    });
    BackgroundJob.setGlobalWarnings(false);
}

