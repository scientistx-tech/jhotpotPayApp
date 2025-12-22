import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, page === 1 && styles.disabled]}
        disabled={page === 1}
        onPress={() => onPageChange(page - 1)}
      >
        <Text style={styles.text}>Previous</Text>
      </TouchableOpacity>
      <Text style={styles.pageText}>{page} / {totalPages}</Text>
      <TouchableOpacity
        style={[styles.button, page === totalPages && styles.disabled]}
        disabled={page === totalPages}
        onPress={() => onPageChange(page + 1)}
      >
        <Text style={styles.text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    gap: 12,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#248AEF',
    borderRadius: 8,
  },
  disabled: {
    backgroundColor: '#E3E7ED',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
  },
  pageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11181C',
  },
});

export default Pagination;
