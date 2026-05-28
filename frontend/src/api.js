import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const analyzeSymptoms = async (text, bodyParts) => {
    try {
        const response = await axios.post(`${API_URL}/analyze`, {
            text: text,
            body_parts: bodyParts
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "Server error" };
    }
};