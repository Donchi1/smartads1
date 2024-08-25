"use client"
import Button from '@/app/components/Buttons';
import H2 from '@/app/components/H2';
import useValidationError from '@/app/components/hooks/UseValidationError';
import Input from '@/app/components/Input'
import Layout from '@/app/components/Layout'
import NavHeader from '@/app/components/NavHeader'
import PhoneNumberInput from '@/app/components/PhoneNumberInput';
import Spinner from '@/app/components/Spinner';
import Text from '@/app/components/Text';
import { auth, db } from '@/db/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react'
import * as Yup from "yup"

const RevolutBindingPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      iban: "",
      revTag: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Fullname is required"),
      iban: Yup.string().required("IBAN is required"),
      revTag: Yup.string().required("RevTag is required"),
      phoneNumber: Yup.string().required("Phone Number is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await setDoc(
          doc(db, `users/${auth.currentUser?.uid}`),
          {
            wallet: {
              ...values,
              address: "",
              type: "revolut",
              totalAmount: 0,
            },
          },
          { merge: true }
        );
        resetForm();
        enqueueSnackbar("You have successfully bound your wallet", { variant: "success" });
      } catch (error: any) {
        resetForm();
        enqueueSnackbar(error?.message || "Failed to bind wallet", { variant: "error" });
      }
    },
  });

  useValidationError(formik);

  const { getFieldProps, isSubmitting, handleSubmit, values, touched, errors, setFieldValue } = formik;

  const renderInputField = (label: string, placeholder: string, name: string) => (
    <label>
      {label}
      {name !== "phoneNumber" ? <Input placeholder={placeholder} {...getFieldProps(name)} />
        : <PhoneNumberInput
          value={values.phoneNumber}
          error={touched.phoneNumber && errors.phoneNumber}
          onChange={(phone) => setFieldValue("phoneNumber", phone)}
        />}
    </label>
  );

  return (
    <>
      <NavHeader headerLeft={{ showHeaderLeft: true }} headerTitle={{ title: "Revolut", showTitle: true }} />
      <main className="w-full h-screen">
        <Layout className="!pt-4">
          <form onSubmit={handleSubmit}>
            {renderInputField("Fullname", "Please Enter Your Fullname", "fullname")}
            {renderInputField("Revolut-IBAN", "Enter Bank Card Number", "iban")}
            {renderInputField("Revtag", "Please Enter Your @Revtag", "revTag")}
            {renderInputField("Phone Number", "Please Enter Phone Number", "phoneNumber")}
            <div className='my-4'>
              <H2 className="!text-[16px] text-black/80">Attention</H2>
              <Text className="text-[17px] !text-black/70">
                1. Please make sure the account details bound are correct to avoid loss.
              </Text>
              <Text className="text-[17px] !text-black/70">
                2. Revolut transfers take about 30-60 minutes to be processed.
              </Text>
              <Text className="text-[17px] !text-black/70">
                3. It takes about 2 hours for transfers to be processed during weekends/holidays. In some cases, it can take about 1 business day to be processed.
              </Text>
            </div>
            <Button className="bg-main-color w-full" title={isSubmitting ? <Spinner /> : "Bind Address"} type="submit" />
          </form>
        </Layout>
      </main>
    </>
  );
};

export default RevolutBindingPage;