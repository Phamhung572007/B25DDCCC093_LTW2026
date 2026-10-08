import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './Style_QLD.css';

const StudentItem = ({ student, onDelete }) => {
    const { id, name, score, className } = student;
    
    const getScoreBadge = (s) => {
        if (s >= 8) return <span className="badge badge-gioi">Giỏi</span>;
        if (s < 5) return <span className="badge badge-truot">Trượt</span>;
        return <span className="badge badge-tb">Khá / TB</span>;
    };

    return (
        <tr>
            <td style={{fontWeight: 700, color: 'var(--primary)'}}>{id}</td>
            <td>{name}</td>
            <td>{className}</td>
            <td>
                <span style={{fontSize: '1.2rem', fontWeight: 700, marginRight: '10px'}}>{score}</span>
                {getScoreBadge(score)}
            </td>
            <td>
                <button className="btn-danger" onClick={() => onDelete(id)}>Xóa</button>
            </td>
        </tr>
    );
};

const StudentList = ({ students, onDelete }) => {
    return (
        <div className="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Mã SV</th>
                        <th>Họ và Tên</th>
                        <th>Lớp Học</th>
                        <th>Điểm Số</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map(student => (
                            <StudentItem key={student.id} student={student} onDelete={onDelete} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{textAlign: 'center', padding: '50px', color: 'var(--text-muted)'}}>
                                <div style={{fontSize: '3rem', margin: '0'}}>📭</div>
                                <div style={{marginTop: '10px'}}>Chưa có dữ liệu sinh viên nào.</div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const App = () => {
    const [students, setStudents] = useState([
        { id: 'SV001', name: 'Nguyễn Văn Anh', score: 9.5, className: 'CNTT-01' },
        { id: 'SV002', name: 'Trần Thị Bảo', score: 4.0, className: 'KTPM-02' },
        { id: 'SV003', name: 'Lê Hoàng Cường', score: 7.5, className: 'HTTT-01' },
        { id: 'SV004', name: 'Phạm Quỳnh Như', score: 8.8, className: 'CNTT-01' },
    ]);

    const [formData, setFormData] = useState({ name: '', score: '', className: '' });
    const [error, setError] = useState('');
    const [filterType, setFilterType] = useState('ALL');

    const { name, score, className } = formData;

    const handleAddStudent = (e) => {
        e.preventDefault();
        
        if (!name.trim() || !score.toString().trim() || !className.trim()) {
            setError('⚠️ Vui lòng nhập đầy đủ họ tên, điểm số và lớp học!');
            return;
        }
        
        const numScore = parseFloat(score);
        if (isNaN(numScore) || numScore < 0 || numScore > 10) {
            setError('⚠️ Điểm số không hợp lệ (Bắt buộc từ 0 đến 10)!');
            return;
        }
        
        setError('');

        const newStudent = {
            id: `SV${Math.floor(Math.random() * 900 + 100)}`,
            name,
            score: numScore,
            className
        };

        setStudents([newStudent, ...students]); 
        setFormData({ name: '', score: '', className: '' });
    };

    const handleDelete = (idToRemove) => {
        if (window.confirm('Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa?')) {
            setStudents(students.filter(student => student.id !== idToRemove));
        }
    };

    const filteredStudents = useMemo(() => {
        if (filterType === 'GIOI') return students.filter(student => student.score >= 8);
        if (filterType === 'TRUOT') return students.filter(student => student.score < 5);
        return students;
    }, [students, filterType]);

    const totalStudents = filteredStudents.length;
    const averageScore = totalStudents > 0 
        ? (filteredStudents.reduce((acc, curr) => acc + curr.score, 0) / totalStudents).toFixed(2) 
        : 0;

    return (
        <div className="container">
            <div className="header">
                <h1>Hệ Thống Quản Lý Điểm Sinh Viên</h1>
                <p>Nền tảng đánh giá và thống kê kết quả học tập chuyên nghiệp</p>
            </div>

            <div className="stats-row">
                <div className="stat-box">
                    <span>Tổng Sinh Viên</span>
                    <h3>{totalStudents} <small style={{fontSize:'1rem', color:'var(--text-muted)'}}>SV</small></h3>
                </div>
                <div className="stat-box">
                    <span>Điểm Trung Bình</span>
                    <h3>{averageScore} <small style={{fontSize:'1rem', color:'var(--text-muted)'}}>/ 10</small></h3>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="card">
                    <h2 className="card-title">Thêm Hồ Sơ Mới</h2>
                    {error && <div className="error-msg">{error}</div>}
                    <form onSubmit={handleAddStudent}>
                        <div className="form-group">
                            <label>Họ và Tên</label>
                            <input type="text" className="form-control" placeholder="Nhập tên sinh viên..." value={name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Lớp Học</label>
                            <input type="text" className="form-control" placeholder="VD: CNTT-01" value={className} onChange={(e) => setFormData({...formData, className: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Điểm Số Tổng Kết</label>
                            <input type="number" step="0.1" className="form-control" placeholder="Từ 0.0 đến 10.0" value={score} onChange={(e) => setFormData({...formData, score: e.target.value})} />
                        </div>
                        <button type="submit" className="btn btn-primary">+ Ghi Nhận Kết Quả</button>
                    </form>
                </div>

                <div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                        <h2 className="card-title" style={{margin: 0}}>Bảng Xếp Hạng</h2>
                        <div className="filter-group">
                            <button className={`btn-filter ${filterType === 'ALL' ? 'active' : ''}`} onClick={() => setFilterType('ALL')}>Tất cả</button>
                            <button className={`btn-filter ${filterType === 'GIOI' ? 'active' : ''}`} onClick={() => setFilterType('GIOI')}>Giỏi (≥ 8.0)</button>
                            <button className={`btn-filter ${filterType === 'TRUOT' ? 'active' : ''}`} onClick={() => setFilterType('TRUOT')}>Trượt (&lt; 5.0)</button>
                        </div>
                    </div>
                    
                    <StudentList students={filteredStudents} onDelete={handleDelete} />
                </div>
            </div>
        </div>
    );
};

export default App;