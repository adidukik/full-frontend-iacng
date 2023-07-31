export const parseRegionName = (fullName) => {
  const lastIndex = fullName.lastIndexOf("/");
  const regionName = fullName.substring(lastIndex + 1).trim();
  return regionName.charAt(0) + regionName.slice(1);
};
