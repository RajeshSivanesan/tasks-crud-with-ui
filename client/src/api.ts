const BASE_URL = 'http://localhost:3000';
const LOGIN_API = '/users/login';
const USERS_API = "/users";
const TASKS_API = "/tasks";

const getSession = () => {
    try {
        return JSON.parse(localStorage.getItem('session') ?? JSON.stringify({}));
    } catch(ex) {
        return {}
    }
};

const setSessionInLocalStorage = (token: string) => {
    localStorage.setItem('session', JSON.stringify(token))
    return true
};

export const postSignup = (user: any) => {
    return fetch(`${BASE_URL}${USERS_API}`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((respose) => respose.json())
        .then((response) => {
            return response;
        })
        .catch(err => {
            throw err;
        });
}

export const postLogin = (user: any) => {
    return fetch(`${BASE_URL}${LOGIN_API}`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((respose) => respose.json())
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch(err => {
            throw err;
        });
}

export const postLogout = () => {
    const { token } = getSession()
    return fetch(`${BASE_URL}${USERS_API}/logout`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then((respose) => respose.json())
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch(err => {
            throw err;
        });
}

export const postCreateTask = (task: any) => {
    const { token } = getSession()
    return fetch(`${BASE_URL}${TASKS_API}`, {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then((respose) => respose.json())
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch(err => {
            throw err;
        });
}

export const getTasks = (limit: number, skip: number) => {
    const { token } = getSession()
    return fetch(`${BASE_URL}${TASKS_API}?limit=${limit}&skip=${skip}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then((respose) => respose.json())
        .then((response) => {
            const tasks = response?.tasks?.map((r: any) => {
                return {
                    ...r,
                    id: r._id
                }
            });
            return {
                tasks: tasks,
                totalCount: response?.totalCount
            }
        })
        .catch(err => {
            throw err;
        });
}

export const filterTasks = (status: string, priority: string, search: string) => {
    const { token } = getSession();
    let url = `${BASE_URL}${TASKS_API}`;
    if (status) {
        url = `${url}${url.includes("?") ? "": "?"}completed=${status}`;
    }
    if (priority) {
        url = `${url}${url.includes("?") ? "": "?"}priority=${priority}`;
    }
    if (search) {
        url = `${url}${url.includes("?") ? "": "?"}search=${search}`; // search by title or description
    }

    return fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then((respose) => respose.json())
        .then((response) => {
            console.log(response);
            const tasks = response?.tasks?.map((r: any) => {
                return {
                    ...r,
                    id: r._id
                }
            });
            return {
                tasks: tasks,
                totalCount: tasks?.length
            }
        })
        .catch(err => {
            throw err;
        });
}

export const updateTask = (taskId: string, body: any) => {
    const { token } = getSession()
    return fetch(`${BASE_URL}${TASKS_API}/${taskId}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    })
        .then((respose) => respose.json())
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch(err => {
            throw err;
        });
}

export const deleteTask = (taskId: string) => {
    const { token } = getSession()
    return fetch(`${BASE_URL}${TASKS_API}/${taskId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then((respose) => respose.json())
        .then((response) => {
            console.log(response);
        })
        .catch(err => {
            throw err;
        });
}