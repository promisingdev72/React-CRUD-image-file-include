/* eslint-disable array-callback-return */
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useState, useCallback } from 'react';
import { useSnackbar } from 'notistack';
// material
import { CardHeader, Card, Box, Container, Grid, Typography, Stack, TextField, CardContent } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { UploadAvatar } from '../../upload';

import BasicTable from './Table';

export default function LandingHero() {
  const [traits, setTraits] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const formikSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required')
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      content: ''
    },
    validationSchema: formikSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        enqueueSnackbar('Add success', { variant: 'success' });
        const { title, content } = values;
        const nId = traits.length + 1;
        const newData = {
          id: nId,
          title,
          content,
          image: avatarUrl.preview
        };
        traits.push(newData);
        console.log(traits);
        setTraits([...traits]);
      } catch (error) {
        console.error(error);
        // if (isMountedRef.current) {
        //   setErrors({ afterSubmit: error.message });
        //   setSubmitting(false);
        // }
      }
    }
  });
  const { errors, touched, getFieldProps, isSubmitting } = formik;
  const handleDropAvatar = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    // console.log(file);
    if (file) {
      setAvatarUrl({
        ...file,
        preview: URL.createObjectURL(file)
      });
    }
  }, []);

  const handleDeleteTrait = (deleteId) => {
    console.log(traits);
    const updatedTraits = [];
    traits.map((trait) => {
      const { id } = trait;
      if (id !== deleteId) {
        updatedTraits.push(trait);
      }
    });
    setTraits([...updatedTraits]);
  };

  const handleEditData = (data) => {
    const finaldata = {
      title: data.utitle,
      content: data.ucontent,
      image: data.uimage.preview
    };
    const updatedTraits = [];
    traits.map((trait) => {
      const { id } = trait;
      if (id === data.uId) {
        console.log('here is final data', finaldata);
        updatedTraits.push(finaldata);
      } else {
        updatedTraits.push(trait);
      }
    });
    setTraits([...updatedTraits]);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: 10 }}>
        <Typography sx={{ color: 'common.black' }} variant="h3">
          Add a Trait to your Persona
        </Typography>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  size="medium"
                  fullWidth
                  type="text"
                  label="Title"
                  {...getFieldProps('title')}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                <Box m={3} />
                <TextField
                  type="text"
                  size="small"
                  rows={9}
                  fullWidth
                  multiline
                  label="Content"
                  {...getFieldProps('content')}
                  error={Boolean(touched.content && errors.content)}
                  helperText={touched.content && errors.content}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title="Upload Image" />
                  <CardContent>
                    <UploadAvatar
                      accept="image/*"
                      file={avatarUrl}
                      onDrop={handleDropAvatar}
                      caption={
                        <Typography
                          variant="caption"
                          sx={{
                            mt: 2,
                            mx: 'auto',
                            display: 'block',
                            textAlign: 'center',
                            color: 'text.secondary'
                          }}
                        >
                          Allowed *.jpeg, *.jpg, *.png, *.gif
                          <br /> max size of 3.1MB
                        </Typography>
                      }
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Box m={3} />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
            >
              ADD TRAIT
            </LoadingButton>
          </Form>
        </FormikProvider>
        <Box m={3} />
        <Stack spacing={3}>
          <Card>
            <CardHeader title="Result Table" />
            <BasicTable traits={traits} onDelete={handleDeleteTrait} onEdit={handleEditData} />
          </Card>
        </Stack>
        <Box m={3} />
      </Container>
    </>
  );
}
