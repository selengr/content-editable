import { Box } from "@mui/material";

const page = () => {
    return (
        <div>
            





            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)'
              }}
              sx={{ direction: 'rtl' }}
            >
              <RHFTextField name="mediaSlug" label="عنوان بنر" dir="ltr" />
              <RHFSelect native name="appType" label="نوع اپ" sx={{ textAlign: 'right' }}>
                {appTypeOptions.map((app: any) => (
                  <option key={app.value} value={app.value}>
                    {app.label}
                  </option>
                ))}
              </RHFSelect>

              
              
              </Box>
        </div>
    );
}

export default page;