
export class API {
  constructor (url) {
    this.url = url;
  }

  // Admin Auth

  // post /admin/auth/register
  postAdminAuthRegister (email, password, name) {
    const payload = {
      email: email,
      password: password,
      name: name,
    }

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    }
    return (fetch(`${this.url}/admin/auth/register`, options));
  }

  // post /admin/auth/login
  postAdminAuthLogin (email, password) {
    const payload = {
      email: email,
      password: password,
    }

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    }
    return (fetch(`${this.url}/admin/auth/login`, options));
  }

  // post /admin/auth/login
  postAdminAuthLogout (token) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: token
      },
    }
    return (fetch(`${this.url}/admin/auth/logout`, options));
  }

  // Admin Quiz Management

  // get /admin/quiz
  getAdminQuiz (token) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: token
      }
    }
    return (fetch(`${this.url}/admin/quiz`, options));
  }

  // post /admin/quiz/new
  postAdminQuizNew (name, token) {
    const payload = {
      name: name
    }

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(payload)
    }
    return (fetch(`${this.url}/admin/quiz/new`, options));
  }

  // get /admin/quiz/{quizid}
  getAdminQuizQuizid (quizid, token) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: token
      }
    }
    return (fetch(`${this.url}/admin/quiz/${quizid}`, options));
  }

  // put /admin/quiz/{quizid}
  putAdminQuizQuizid (data, quizid, token) {
    const options = {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(data)
    }
    return (fetch(`${this.url}/admin/quiz/${quizid}`, options));
  }

  // delete /admin/quiz/{quizid}
  deleteAdminQuizQuizid (quizid, token) {
    const options = {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        Authorization: token
      },
    }
    return (fetch(`${this.url}/admin/quiz/${quizid}`, options));
  }

  // post /admin/quiz/{quizid}/start
  postAdminQuizQuizidStart (quizid, token) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: token
      },
    }
    return (fetch(`${this.url}/admin/quiz/${quizid}/start`, options));
  }

  // post /admin/quiz/{quizid}/advance
  postAdminQuizQuizidAdvance (quizid, token) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: token
      },
    }
    return (fetch(`${this.url}/admin/quiz/${quizid}/advance`, options));
  }

  // post /admin/quiz/{quizid}/end
  postAdminQuizQuizidEnd (quizid, token) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: token
      },
    }
    return (fetch(`${this.url}/admin/quiz/${quizid}/end`, options));
  }

  // get /admin/session/{sessionid}/status
  getAdminSessionSessionidStatus (sessionid, token) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: token
      },
    }
    return (fetch(`${this.url}/admin/session/${sessionid}/status`, options));
  }

  // get /admin/session/{sessionid}/results
  getAdminSessionSessionidResults (sessionid, token) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: token
      },
    }
    return (fetch(`${this.url}/admin/session/${sessionid}/results`, options));
  }

  // Player

  // post /play/join/{sessionid}
  postPlayJoinSessionid (sessionid, name) {
    const payload = {
      name: name,
    }

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    }
    return (fetch(`${this.url}/play/join/${sessionid}`, options));
  }

  // get /play/{playerid}/status
  getPlayPlayeridStatus (playerid) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json'
      },
    }
    return (fetch(`${this.url}/play/${playerid}/status`, options));
  }

  // get /play/{playerid}/question
  getPlayPlayeridQuestion (playerid) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json'
      },
    }
    return (fetch(`${this.url}/play/${playerid}/question`, options));
  }

  // get /play/{playerid}/answer
  getPlayPlayeridAnswer (playerid) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json'
      },
    }
    return (fetch(`${this.url}/play/${playerid}/answer`, options));
  }

  // put /play/{playerid}/answer
  putPlayPlayeridAnswer (playerid, data) {
    const payload = {
      answerIds: data,
    }
    const options = {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
    return (fetch(`${this.url}/play/${playerid}/answer`, options));
  }

  // get /play/{playerid}/results
  getPlayPlayeridResults (playerid) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json'
      },
    }
    return (fetch(`${this.url}/play/${playerid}/results`, options));
  }
}

const api = new API('http://localhost:5005');
export default api;
