import * as request from '~/utils/request';
export const search = async (q, type = 'less') => {
    try {
        const res = await request.get(`users/search`, {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }

    // convert tu File json
    // .then((res) => r es.json())
    // Neu co ket qua tim kiem =>
};
