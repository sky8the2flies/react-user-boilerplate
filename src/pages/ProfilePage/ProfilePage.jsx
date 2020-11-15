import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './ProfilePage.css';

import profileApi from '../../services/profileApi';
import Loader from '../../components/Loader/Loader';

const ProfilePage = (props) => {
    const [profile, setProfile] = useState(props.other ? null : props.profile);
    const [loading, setLoading] = useState(props.other ? true : false);
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            if (!id) return;
            const profile = await profileApi.getOtherProfile(props.user, id);
            setProfile(profile);
            setLoading(false);
        }
        fetchData();
        return () => {};
    }, [id, props.user]);

    return (
        <>
            {loading ? (
                <>
                    <Loader />
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default ProfilePage;
