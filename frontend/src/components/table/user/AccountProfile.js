import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    Typography
  } from '@mui/material';
  import PropTypes from 'prop-types';
  import * as React from "react";
  
  const value = {
    avatar: '/static/images/avatars/avatar_6.png',
    city: 'Iğdır',
    country: 'Türkiye',
    jobTitle: 'Frontendçi',
    name: 'Kütür Kütür Şad',
  };
  
  export const AccountProfile = ({user}) => (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {user.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {user.department.departmentName}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );

  AccountProfile.propTypes = {
    user: PropTypes.object,
  };