import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

/**
 * Export attendance data to PDF
 * @param {Object} sessionDetails - Session details from API
 * @param {Object} selectedCourse - Selected course object
 */
export const exportToPDF = (sessionDetails, selectedCourse) => {
  try {
    const pdf = new jsPDF();
    
    // Add title
    pdf.setFontSize(18);
    pdf.setTextColor(41, 128, 185);
    pdf.text('📋 ATTENDANCE REPORT', 14, 22);
    
    // Reset color
    pdf.setTextColor(0, 0, 0);
    
    // Add course and session info
    pdf.setFontSize(11);
    pdf.text(`Course: ${selectedCourse?.name || 'N/A'}`, 14, 32);
    pdf.text(`Code: ${selectedCourse?.code || 'N/A'}`, 14, 39);
    pdf.text(`Date: ${new Date(sessionDetails?.session?.startTime).toLocaleDateString()}`, 14, 46);
    pdf.text(`Time: ${new Date(sessionDetails?.session?.startTime).toLocaleTimeString()}`, 14, 53);
    
    // Add statistics box
    pdf.setFillColor(230, 240, 250);
    pdf.rect(14, 60, 180, 30, 'F');
    
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'bold');
    pdf.text(`Total Students: ${sessionDetails?.stats?.total || 0}`, 20, 70);
    pdf.text(`Present: ${sessionDetails?.stats?.present || 0}`, 80, 70);
    pdf.text(`Absent: ${sessionDetails?.stats?.absent || 0}`, 140, 70);
    pdf.text(`Attendance: ${sessionDetails?.stats?.percentage || 0}%`, 20, 85);
    
    pdf.setFont(undefined, 'normal');
    
    // Prepare table data
    const tableData = sessionDetails?.students?.map(student => [
      student.studentId || 'N/A',
      student.name || 'N/A',
      student.email || 'N/A',
      student.department || 'N/A',
      `${student.year || 'N/A'}`,
      student.section || 'N/A',
      student.status === 'PRESENT' ? '✓ Present' : '✗ Absent'
    ]) || [];

    // Add table
    autoTable(pdf, {
      startY: 100,
      head: [['Student ID', 'Name', 'Email', 'Department', 'Year', 'Section', 'Status']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [0, 0, 0]
      },
      alternateRowStyles: {
        fillColor: [245, 248, 252]
      },
      margin: { top: 100, right: 14, bottom: 20, left: 14 }
    });

    // Add footer
    const pageCount = pdf.internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(9);
      pdf.setTextColor(128, 128, 128);
      pdf.text(
        `Page ${i} of ${pageCount} | Generated on ${new Date().toLocaleString()}`,
        pdf.internal.pageSize.getWidth() / 2,
        pdf.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    // Save PDF
    const filename = `attendance_${selectedCourse?.code}_${new Date(sessionDetails?.session?.startTime).toISOString().split('T')[0]}.pdf`;
    pdf.save(filename);
    
    return { success: true, message: 'PDF exported successfully' };
  } catch (error) {
    console.error('Error exporting PDF:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Export attendance data to Excel
 * @param {Object} sessionDetails - Session details from API
 * @param {Object} selectedCourse - Selected course object
 */
export const exportToExcel = (sessionDetails, selectedCourse) => {
  try {
    // Prepare data for Excel with proper formatting
    const data = [
      ['ATTENDANCE REPORT'],
      [],
      [`Course: ${selectedCourse?.name || 'N/A'}`, `Code: ${selectedCourse?.code || 'N/A'}`],
      [`Date: ${new Date(sessionDetails?.session?.startTime).toLocaleDateString()}`],
      [`Time: ${new Date(sessionDetails?.session?.startTime).toLocaleTimeString()}`],
      [],
      ['STATISTICS'],
      [`Total Students: ${sessionDetails?.stats?.total || 0}`, `Present: ${sessionDetails?.stats?.present || 0}`, `Absent: ${sessionDetails?.stats?.absent || 0}`, `Attendance %: ${sessionDetails?.stats?.percentage || 0}%`],
      [],
      ['Student ID', 'Name', 'Email', 'Department', 'Year', 'Section', 'Status'],
      ...sessionDetails?.students?.map(student => [
        student.studentId || 'N/A',
        student.name || 'N/A',
        student.email || 'N/A',
        student.department || 'N/A',
        student.year || 'N/A',
        student.section || 'N/A',
        student.status === 'PRESENT' ? 'Present' : 'Absent'
      ]) || []
    ];

    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    
    // Set column widths for better readability
    worksheet['!cols'] = [
      { wch: 14 },
      { wch: 22 },
      { wch: 28 },
      { wch: 18 },
      { wch: 10 },
      { wch: 12 },
      { wch: 15 }
    ];

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

    // Save Excel file
    const filename = `attendance_${selectedCourse?.code}_${new Date(sessionDetails?.session?.startTime).toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, filename);
    
    return { success: true, message: 'Excel exported successfully' };
  } catch (error) {
    console.error('Error exporting Excel:', error);
    return { success: false, error: error.message };
  }
};

// ✅ ADMIN DASHBOARD EXPORTS

/**
 * Export Students to PDF
 */
export const exportStudentsToPDF = (students, users) => {
  try {
    const pdf = new jsPDF();
    
    pdf.setFontSize(18);
    pdf.setTextColor(41, 128, 185);
    pdf.text('👥 STUDENTS REPORT', 14, 15);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 14, 25);
    
    const studentData = students.map(student => {
      const user = users.find(u => u._id === student.userId);
      return [
        student.studentId || 'N/A',
        user?.name || 'N/A',
        user?.email || 'N/A',
        student.department || 'N/A',
        `Year ${student.year}`,
        student.section || 'N/A'
      ];
    });

    autoTable(pdf, {
      startY: 35,
      head: [['Student ID', 'Name', 'Email', 'Department', 'Year', 'Section']],
      body: studentData,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [0, 0, 0]
      },
      alternateRowStyles: {
        fillColor: [245, 248, 252]
      }
    });

    const pageCount = pdf.internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(9);
      pdf.setTextColor(128, 128, 128);
      pdf.text(
        `Page ${i} of ${pageCount}`,
        pdf.internal.pageSize.getWidth() / 2,
        pdf.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    pdf.save('Students_Report.pdf');
  } catch (error) {
    console.error('Error exporting students PDF:', error);
  }
};

/**
 * Export Teachers to PDF
 */
export const exportTeachersToPDF = (users) => {
  try {
    const pdf = new jsPDF();
    
    pdf.setFontSize(18);
    pdf.setTextColor(41, 128, 185);
    pdf.text('👨‍🏫 TEACHERS REPORT', 14, 15);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 14, 25);
    
    const teacherData = users
      .filter(u => u.role === 'TEACHER')
      .map(teacher => [
        teacher.name,
        teacher.email,
        teacher.role,
        new Date(teacher.createdAt).toLocaleDateString()
      ]);

    autoTable(pdf, {
      startY: 35,
      head: [['Name', 'Email', 'Role', 'Created Date']],
      body: teacherData,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [0, 0, 0]
      },
      alternateRowStyles: {
        fillColor: [245, 248, 252]
      }
    });

    const pageCount = pdf.internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(9);
      pdf.setTextColor(128, 128, 128);
      pdf.text(
        `Page ${i} of ${pageCount}`,
        pdf.internal.pageSize.getWidth() / 2,
        pdf.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    pdf.save('Teachers_Report.pdf');
  } catch (error) {
    console.error('Error exporting teachers PDF:', error);
  }
};

/**
 * Export Courses to PDF
 */
export const exportCoursesToPDF = (courses, users) => {
  try {
    const pdf = new jsPDF();
    
    pdf.setFontSize(18);
    pdf.setTextColor(41, 128, 185);
    pdf.text('📚 COURSES REPORT', 14, 15);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 14, 25);
    
    const courseData = courses.map(course => {
      const teacher = users.find(u => u._id === course.teacherId);
      return [
        course.code,
        course.name,
        course.department,
        `Year ${course.year}, Section ${course.section}`,
        teacher?.name || 'Unassigned'
      ];
    });

    autoTable(pdf, {
      startY: 35,
      head: [['Code', 'Name', 'Department', 'Year/Section', 'Teacher']],
      body: courseData,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [0, 0, 0]
      },
      alternateRowStyles: {
        fillColor: [245, 248, 252]
      }
    });

    const pageCount = pdf.internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(9);
      pdf.setTextColor(128, 128, 128);
      pdf.text(
        `Page ${i} of ${pageCount}`,
        pdf.internal.pageSize.getWidth() / 2,
        pdf.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    pdf.save('Courses_Report.pdf');
  } catch (error) {
    console.error('Error exporting courses PDF:', error);
  }
};

// ✅ EXCEL EXPORTS

/**
 * Export Students to Excel
 */
export const exportStudentsToExcel = (students, users) => {
  try {
    const studentData = students.map(student => {
      const user = users.find(u => u._id === student.userId);
      return {
        'Student ID': student.studentId || 'N/A',
        'Name': user?.name || 'N/A',
        'Email': user?.email || 'N/A',
        'Department': student.department || 'N/A',
        'Year': student.year || 'N/A',
        'Section': student.section || 'N/A'
      };
    });

    const ws = XLSX.utils.json_to_sheet(studentData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'Students_Report.xlsx');
  } catch (error) {
    console.error('Error exporting students Excel:', error);
  }
};

/**
 * Export Teachers to Excel
 */
export const exportTeachersToExcel = (users) => {
  try {
    const teacherData = users
      .filter(u => u.role === 'TEACHER')
      .map(teacher => ({
        'Name': teacher.name,
        'Email': teacher.email,
        'Role': teacher.role,
        'Created Date': new Date(teacher.createdAt).toLocaleDateString()
      }));

    const ws = XLSX.utils.json_to_sheet(teacherData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Teachers');
    XLSX.writeFile(wb, 'Teachers_Report.xlsx');
  } catch (error) {
    console.error('Error exporting teachers Excel:', error);
  }
};

/**
 * Export Courses to Excel
 */
export const exportCoursesToExcel = (courses, users) => {
  try {
    const courseData = courses.map(course => {
      const teacher = users.find(u => u._id === course.teacherId);
      return {
        'Code': course.code,
        'Name': course.name,
        'Department': course.department,
        'Year': course.year,
        'Section': course.section,
        'Teacher': teacher?.name || 'Unassigned'
      };
    });

    const ws = XLSX.utils.json_to_sheet(courseData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Courses');
    XLSX.writeFile(wb, 'Courses_Report.xlsx');
  } catch (error) {
    console.error('Error exporting courses Excel:', error);
  }
};

/**
 * Export ALL data to Excel (Multiple Sheets)
 */
export const exportAllDataToExcel = (students, users, courses) => {
  try {
    const studentData = students.map(student => {
      const user = users.find(u => u._id === student.userId);
      return {
        'Student ID': student.studentId || 'N/A',
        'Name': user?.name || 'N/A',
        'Email': user?.email || 'N/A',
        'Department': student.department || 'N/A',
        'Year': student.year || 'N/A',
        'Section': student.section || 'N/A'
      };
    });

    const teacherData = users
      .filter(u => u.role === 'TEACHER')
      .map(teacher => ({
        'Name': teacher.name,
        'Email': teacher.email,
        'Role': teacher.role
      }));

    const courseData = courses.map(course => {
      const teacher = users.find(u => u._id === course.teacherId);
      return {
        'Code': course.code,
        'Name': course.name,
        'Department': course.department,
        'Year': course.year,
        'Section': course.section,
        'Teacher': teacher?.name || 'Unassigned'
      };
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(studentData), 'Students');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(teacherData), 'Teachers');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(courseData), 'Courses');
    
    XLSX.writeFile(wb, 'VisioMark_Complete_Report.xlsx');
  } catch (error) {
    console.error('Error exporting complete Excel:', error);
  }
};